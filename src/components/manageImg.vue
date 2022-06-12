<template>
  <div class="out">
    <el-scrollbar height="600px">
    <div class="li">
      <!-- 上传文件按钮，绑定change事件 -->
      <div class="upload">
        <input type="file" id="file" @change="add($event)" />
      </div>
      <!-- 显示图片的盒子 -->
      <div class="container">
        <!-- 假如变量imgs为接口返回的图片数组，循环显示 -->
        <div v-for="(item, index) in imgs" :key="index" class="inner">
          <!-- 服务端地址 + 数据库里的 icon字段 便可以显示一张图片 -->
          <img :src="'http://localhost:3000/' + item.icon" alt="" lazy/>
         
        
          <el-popconfirm
            title="确定要删除这张图片？"
            @confirm="deleteImg(item)"
            confirm-button-text="确定"
            cancel-button-text="还是算了"
          >
            <template #reference>
              <el-button type="danger" plain style="margin: 10px"
                >删除图片</el-button
              >
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
    </el-scrollbar>
  </div>
</template>

<script >
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { toRaw } from "@vue/reactivity";
// import type { UploadRawFile, UploadFile, FormInstance, Action } from 'element-plus';
// import { ElMessage, ElMessageBox } from 'element-plus';
// import { uploadImage } from '../../apis/project';
import { postDeleteImg } from "@/http/img";

export default {
  setup() {
    // const uploadFile = ref();

    const state = reactive({
      imgs: [],
    });

    const add = (e) => {
      //获取到第一个文件
      var file = e.target.files[0];
      //可打印看看
      // console.log(e.target.files);
      //新建一个 FormData 对象
      var param = new FormData();
      // 把文件添加到 FormData对象里
      param.append("icon", file);
      //可以打印看看
      // console.log(param.get("icon"));
      //利用axios发送post请求
      axios
        .post("http://localhost:3000/api/addImg", param, {
          headers: { "Content-Type": "multipart/form-data", 'Authorization': 'Bearer '+ window.localStorage.getItem('token') },
        })
        .then((res) => {
          ElMessage({
            message: "图片上传成功！",
            type: "success",
          });
          //调用查询方法
          qy();
        });
    };

    const deleteImg = (item) => {
      postDeleteImg(toRaw(item)).then((res) => {
        // console.log(res)
        ElMessage("图片已删除");
      });
    };

    onMounted(() => {
      qy();
    });

    //查询
    const qy = () => {
      axios({
        url: "http://localhost:3000/api/all",
        method: "get",
        headers: {
        'Content-Type': "application/json;charset=utf-8",
        'Authorization': 'Bearer '+ window.localStorage.getItem('token')
    }
      }).then((res) => {
        //把后端返回数据赋值给imgs
        state.imgs = res.data.data;
      });
    };

    return {
      ...toRefs(state),
      add,
      qy,
      deleteImg,
    };
  },
};
</script>

<style lang="scss" scoped>
.out {
  .li {
    margin: 10px 0;
    padding: 10px;
    background-color: rgba($color: white, $alpha: 0.8);

    border-radius: 5px;
    .container {
      margin: 30px auto;
      padding: 0px 0;
      width: 80%;
      // box-shadow: 0 0 5px rgb(190, 190, 190);
      display: flex;
      flex-wrap: wrap;
      // justify-content: center;
      .inner {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .container img {
      width: 350px;
      // height: 150px;
      object-fit: cover;
      margin: 15px auto;
    }
    .upload {
      margin: 0 auto;
      width: 100px;
      height: 30px;
      // font-size: 20px;
      background-color: white;
      border: 1px solid #337dbc;
      border-radius: 5px;
      position: relative;
    }
    .upload:hover {
      background-color: rgba(135, 206, 235, 0.2);
    }
    .upload::before {
      position: absolute;
      top: 5px;
      left: 0;
      right: 0;
      bottom: 0;
      content: "上传图片";
      font-size: 18px;
      text-align: center;
      // font-family: "fangsong";
      line-height: 20px;
      user-select: none;
    }
    #file {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}
</style>