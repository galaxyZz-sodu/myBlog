<template>
  <div class="container">
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 left">
      <LeftNav />
    </div>

    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 mid">
      <router-view />
    </div>

    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 right">
      <RightNav />

     <!--  <audio ref='audio' controls src="http://m7.music.126.net/20210703093929/04ededfb89377755b7c4678a9c84e35f/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3" autoplay>
    您的浏览器不支持 audio 元素。
</audio> -->
    </div>
  </div>
  <!-- <img :src="imgSrc" alt=""> -->
</template>

<script>
import { reactive, toRefs, onMounted, nextTick, provide, ref } from "vue";
import LeftNav from "@/components/LeftNav.vue";
import RightNav from "@/components/RightNav.vue";
import { getList } from "@/http/list";
import { useStore } from "vuex";
export default {
  components: { LeftNav, RightNav },
  setup() {
    const state = reactive({
      count: 0,
      // imgSrc: require("@/assets/魔方.jpg"),
      // audioSrc: require('@/assets/背景音乐1.mp3'),
    });
    // const audio = ref('@/assets/背景音乐1.mp3');
    const store = useStore();
    onMounted(() => {
      getList().then((res) => {
        // console.log(res)
        // state.listData = ;
        // console.log(state.listData);
        store.commit("listDataMut", res.data.list);
      });
      // console.log(audio.value.src = require('@/assets/背景音乐1.mp3'));
      // audio.value.audio = require('@/assets/背景音乐1.mp3')
    });

    // 局部组件刷新
    /*   const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide("reload", reload); */

    return {
      ...toRefs(state),
      // isRouterAlive,
      store,
      // audio
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-image: url("@/assets/夜晚2.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  // backdrop-filter: blur(2px) brightness(50%);

  width: 100%;
  padding: 0 0;
  .left {
    height: 100%;
  }
}
</style>