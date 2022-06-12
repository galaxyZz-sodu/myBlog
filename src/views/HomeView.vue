<template>
  <div class="out">
    <div class="commendOut">
      <div class="gitTitle">
        github项目推送
      </div>
      <el-scrollbar height="400px" >
    <Recommend/>
    </el-scrollbar>
    </div>
    
    <div
      class="li"
      v-for="item in listData2"
      :key="item.id"
      @click="goDetail(item)"
    >
      <div class="title">{{ item.title }}</div>
      <!-- <div class="line"></div> -->
      <div class="text">{{ item.introduce }}</div>
      <div class="time"><span class="iconfont icon-shijian"></span>{{ item.time.substring(0, 10) }}</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import { getList } from "@/http/list";
import Recommend from '@/components/Recommend.vue'
export default {
  components: {Recommend},
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      count: 0,
      // listData: [],
    });
    const goDetail = (item) => {
      // console.log(item)
      let copyObj = JSON.parse(JSON.stringify(item));
      // console.log(copyObj)
      localStorage.setItem("data", JSON.stringify(copyObj));
      
      router.push("/detail");
      
    };

    const listData2 = computed(() => store.state.listData)

    const formateDate = (date) => {
      const arr = date.split("T");
      const d = arr[0];
      const darr = d.split("-");

      const t = arr[1];
      const tarr = t.split(".000");
      const marr = tarr[0].split(":");

      const dd =
        parseInt(darr[0]) +
        "-" +
        parseInt(darr[1]) +
        "-" +
        parseInt(darr[2]) +
        " " +
        parseInt(marr[0]) +
        ":" +
        parseInt(marr[1]);
      return dd;
    };

    onMounted(() => {
      window.scrollTo(0, 0);
    });

    return {
      ...toRefs(state),
      formateDate,
      goDetail,
      store,
      listData2
    };
  },
};
</script>

<style lang="scss" scoped>
.out {
  .commendOut {
    margin-top: 20px;
    .gitTitle {
      background-color: rgba($color: #ffa41f, $alpha: 0.2);
      backdrop-filter: blur(4px);
      color: white;
      padding: 10px 15px;
      font-size: 25px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
  .li {
    margin: 20px 0;
    box-shadow: 10px -10px 20px rgba(0, 0, 0, 0.2),
    -10px 10px 20px rgba(255, 255, 255, 0.1);
    background-color: rgba($color: white, $alpha: 0.4);
    backdrop-filter: blur(4px);
    border: 2px solid transparent;
    border-radius: 5px;
    transition: border 0.8s, transform 0.5s, background-color 0.5s;

    .title {
      padding: 10px 15px 0;
      //   padding-top: 10px;
      font-size: 30px;
      color: white;
      transition: color 0.5s;
    }
    .text {
      padding: 5px 15px 10px;
      font-size: 18px;
      color: white;
      font-weight: 800px;
      transition: color 0.5s;
    }
    .time {
      padding: 5px 15px 15px;
      font-size: 14px;
      color: white;
      transition: color 0.5s;
      .iconfont {
        margin-right: 5px;
        
      }
    }
  }

  .li:hover {
    // box-shadow: 0px 2px 8px black;
    // transform: scale(1.01, 1.01);
    background-color: white;
    border: 2px solid #ffa41f;
    color: #7f7f7f;
  }
  /* .li:hover .text{
            color: black;
        } */
  .li:hover .title{
            color:#ffa41f;
        }
  .li:hover .text {
    color: #7f7f7f;
  }
  .li:hover .time {
    color: #7f7f7f;
  }
}
</style>