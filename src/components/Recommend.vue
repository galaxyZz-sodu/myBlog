<template>
  <div v-show="githubList.length == 0" class="loading">
    <el-icon style="font-size: 5rem"><Loading /></el-icon>
    <div style="font-size: 3rem">加载中</div>
  </div>
  
  <div class="out">
    <ul>
      <li v-for="item in githubList" :key="item.id" class="gitLi">
        <div class="in">
          <a :href="item.url">
            <div class="title">{{ item.username }}/{{ item.reponame }}</div></a
          >
          <div class="description">{{ item.description }}</div>
          <div class="more">
            <div class="star"><span class="iconfont icon-star"></span>{{ item.starCount }}</div>
            <div class="fork"><span class="iconfont icon-code-fork"></span>{{ item.forkCount }}</div>
            <div class="language" v-show="item.lang"><span class="iconfont icon-shuju"></span>{{ item.lang }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
const axios = require("axios");
axios.defaults.baseURL = "/juejin";
export default {
  setup() {
    const state = reactive({
      count: 0,
      githubList: [],
    });
    const postRecommend = () =>
      axios({
        url: "/resources/github",
        timeout: 5000,
        method: "post",
      });
    onMounted(() => {
      try {
        postRecommend().then((res) => {
          state.githubList = res.data.data;
          // console.log(state.githubList);
        });
      } catch(err) {
        console.log('github推荐请求失败', err)
      }
      
    });
    return {
      ...toRefs(state),
      postRecommend,
    };
  },
};
</script>

<style lang="scss" scoped>
.loading {
  padding-top: 10rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.out {
  //   margin: 20px 0;
  // background-color: rgba($color: white, $alpha: 0.4);
  // backdrop-filter: blur(4px);
  width: 100%;
  // border-radius: 5px;
  display: flex;
  flex-direction: row;

  ul {
    padding: 5px;
    column-count: 2;
    column-gap: 10px;
    li {
      border: 2px solid transparent;
      background-color: rgba($color: black, $alpha: 0.2);
 
      border-radius: 5px;
      margin-bottom: 10px;
      padding: 5px 10px;
      overflow: hidden;
      transition: border 0.5s, background-color 0.5s ;
      break-inside: avoid;
      a {
        text-decoration: none;
        font-size: 25px;
        .title {
            transition: color 0.5s;
            color: white;
        }
      }
      
      .description {
        color: white;
        font-size: 15px;
        margin: 10px 0;
        transition: color 0.5s;
      }
      .more {
        display: flex;
        width: 100px;
        color: white;
        justify-content: flex-start;
        transition: color 0.5s;
        .star {
          margin-right: 20px;
        }
        .fork {
          margin-right: 20px;
        }
      }
    }
    li:hover {
        border: 2px solid #FFA41F;
        background-color: white;
    }
    li:hover .title {
        color: #FFA41F;
    }
    li:hover .description {
        color: #4E5969;
    }
    li:hover .more {
        color: #7f7f7f;
    }
  }

  //   transition: box-shadow 0.8s, transform 0.5s, background-color 0.5s;
}
</style>