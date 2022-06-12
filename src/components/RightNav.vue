<template>
  <div class="out">
    <div class="inner">
      <div class="img">
        <img src="@/assets/头像png.png" alt="" />
      </div>

      <div class="name">129K</div>
      <div class="motto">
        村口的狗叫了，其它的狗也跟着叫，但是它们不知道为什么叫
      </div>
      <div class="title">
        <a href="https://github.com/galaxyZz-sodu"
          ><text class="github">GitHub</text></a
        >
        <a href="javascript:;" class="emailout">
          <text class="email">QQ邮箱</text>
          <div class="qqhao">1198636978@qq.com</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 992px) {
  .out {
    // height: 600px;
    margin-bottom: 30px;
  }
  .inner {
    
    backdrop-filter: blur(4px);
    background-color: rgba($color: white, $alpha: 0.4);
    color: white;
    padding: 20px 0;
    margin-top: 20px;
    border-radius: 5px;
  }
}
@media screen and (min-width: 993px) {
  .out {
    height: 800px;
  }
  .inner {
    
    
    backdrop-filter: blur(4px);

    position: fixed;
    margin-right: 20px;
    background-color: rgba($color: white, $alpha: 0.4);
    color: white;
    padding: 20px 0;
    margin-top: 20px;
    border-radius: 5px;
  }
}

.out {
  .img {
    background-color: rgb(252, 252, 252);
    width: 120px;
    border-radius: 80px;
    margin: 10px auto;
    transition: transform 0.8s;
    //  transition: background-color 0.5s;
  }
  img {
    width: 100%;
  }
  .img:hover {
    transform: rotate(360deg) scale(1.1, 1.1);
    // background-color: rgb(20, 35, 40);
  }
  .name {
    color: #FFA41F;
    margin: 20px auto;
    text-align: center;
    font-size: 20px;
  }
  .motto {
    padding: 10px 20px;
    text-align: center;
  }
  .title {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .email {
      background-color: #337DBC;
      color: #dee2e6;
    }
    .github {
      background-color: #3B3D3A;
      color: #dee2e6;
    }
    a {
      text-decoration: none;
      position: relative;
      .qqhao {
        position: absolute;
        right: 0px;
        padding: 3px;
        background-color: #337DBC;
        color: #dee2e6;
        border-radius: 5px;
        display: none;
        // transition: display 0.5s;
      }
    }
    .emailout:hover .qqhao {
      display: block;
    }
  }
  .title text {
    display: block;
    height: 30px;
    width: 80px;
    line-height: 30px;
    text-align: center;
    background-color: rgba($color: #6b808e, $alpha: 0.8);
    border-radius: 10px;
    margin-top: 10px;
    transition: color 0.5s;
  }
  .title text:hover {
    color: #FFA41F;
  }
}
</style>