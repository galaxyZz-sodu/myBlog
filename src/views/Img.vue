<template>
  <div class="out">
    <div class="li">
      <el-scrollbar height="700px">
        <div class="demo-image__lazy">
          <!-- 服务端地址 + 数据库里的 icon字段 便可以显示一张图片 -->
          <el-image
            v-for="item in imgs"
            :src="'http://localhost:3000/' + item.icon"
            :key="'http://localhost:3000/' + item.icon"
            lazy
          />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      count: 0,
      imgs: [],
    });
    onMounted(() => {
      qy();
    });
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
      qy,
    };
  },
};
</script>

<style lang="scss" scoped>
.out {
  .li {
    margin: 20px 0;
    padding: 10px;
    background-color: rgba($color: white, $alpha: 0.4);
    backdrop-filter: blur(4px);
    border-radius: 5px;
    .demo-image__lazy {
      height: 700px;
      // overflow: scroll;
    }
    .demo-image__lazy .el-image {
      display: block;
      min-height: 200px;
      margin-bottom: 10px;
    }
    .demo-image__lazy .el-image:last-child {
      margin-bottom: 0;
    }
  }
}
</style>