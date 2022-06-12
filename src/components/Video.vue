<template>
  <div class="li">
    <div class="upload">
      <input type="file" id="file" @change="add($event)" />
    </div>
    <div class="video">
      <!-- <video src="http://localhost:3000/"></video> -->
      <!-- <img src="http://localhost:3000/video/files/二次元1.jpg" alt=""> -->
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
      size: 1024 * 1024 * 10,
      videos: []
    });

  onMounted(() => {
    axios({
        url: "http://localhost:3000/api/allVideo",
        method: "get",
        headers: {
        'Content-Type': "application/json;charset=utf-8",
        'Authorization': 'Bearer '+ window.localStorage.getItem('token')
    }
      }).then((res) => {
        //把后端返回数据赋值给imgs
        console.log('videos',res)
        state.videos = res.data.data;
      });
  })
    // 上传之后的反应
    const add = async (e) => {
    
      e.preventDefault();
      const file = e.target.files[0];
      console.log(file)
      if (!file) return;
      /* window.file = file;
      console.log(window.file); */
      try {
        const FileChunks = createFileChunks(file);
        await uploadFileChunks(FileChunks, file.name);
        let timer = setInterval(() => {
          mergeFileChunk(file.name);
          console.log("上传成功！");
          clearInterval(timer)
        }, 1000)
        
        
      } catch (err) {
        console.log(err);
      }
    };

    // 创建切片
    const createFileChunks = (file, size = state.size) => {
      const fileChunks = [];
      console.log('22',file)
      for (let cur = 0; cur < file.size; cur += size) {
        fileChunks.push(file.slice(cur, cur + size));
      }
      console.log(fileChunks);
      return fileChunks;
    };

    // 并发上传切片
    const uploadFileChunks = async (fileChunks, filename) => {
        console.log('33',fileChunks)
      const formDataList = fileChunks.map((chunk, index) => {
        const formData1 = new window.FormData();
        formData1.append("index", index);
        formData1.append("filename", filename);
        formData1.append("chunk", chunk);
        return { formData1 };
      });

      const axiosList = formDataList.map(({ formData1 }) =>
        axios({
          method: "post",
          url: "http://localhost:3000/api/uploadVideo",
          data: formData1,
        })
      );
      Promise.all(axiosList);
    };

    // 合并切片
    const mergeFileChunk = async (filename) => {
       await axios({
        method: "get",
        url: "http://localhost:3000/api/merge",
        params: {
          filename,
        },
      });
    };
    return {
      ...toRefs(state),
      add,
      createFileChunks,
      uploadFileChunks,
      mergeFileChunk,
    };
  },
};
</script>

<style lang="scss" scoped>
.li {
  margin: 10px 0;
  padding: 10px;
  background-color: rgba($color: white, $alpha: 0.8);

  border-radius: 5px;
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
    content: "上传视频";
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
</style>