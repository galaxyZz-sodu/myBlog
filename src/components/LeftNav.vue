<template>
  <div class="out">
    <div class="inner">
      <ul>
        <!-- 搜索按钮 -->
        <el-popover placement="bottom" :width="230" trigger="click">
          <div style="width: 200px; height: 35px; border: 1px solid #0078E7">
            <input
              v-model="searchInfo"
              type="text"
              style="
                outline: none;
                border: none;
                line-height: 30px;
                width: 180px;
              "
            />
          </div>

          <el-button
            @click="searchList"
            color="#0078E7"
            plain
            style="margin: 10px 20px; width: 160px"
            >搜索</el-button
          >
          <!-- <el-button size="large" :icon="Search">Search</el-button> -->
          <template #reference>
            <li class="search" ><span class="iconfont icon-sousuo"></span>搜索</li>
          </template>
        </el-popover>

        <!-- 主页按钮 -->
        <li class="main" @click="goHome" :class="activeCol == 2 ? 'active' : ''"><span class="iconfont icon-home"></span>主页</li>

        <!-- 图片按钮 -->
        <li @click="goImg" :class="activeCol == 3 ? 'active' : ''"><span class="iconfont icon-tupian"></span>图片</li>

        <!-- 更多按钮 -->
        <li>
          <el-dropdown size="large"  >
            <span class="el-dropdown-link">
              <div class="more" style="" ><span class="iconfont icon-gengduo"></span>更多</div>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item style="font-size: 16px; padding: 10px 50px" @click="goAbout">关于我</el-dropdown-item>
                <el-dropdown-item style="font-size: 16px; padding: 10px 50px" @click="goManage">博客管理</el-dropdown-item>
                
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import { ArrowDown } from "@element-plus/icons-vue";
export default {
  name: "TopNav",
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      count: 0,
      searchInfo: "",
      activeCol: 2
    });
    const goHome = () => {
      state.activeCol = 2
      router.replace("/");
    };
    const goImg = () => {
      state.activeCol = 3
      router.push("/images")
    }
    const goAbout = () => {
      state.activeCol = 4
      router.push("./about")
    };
    const goManage = () => {
      state.activeCol = 4
      router.push("/manage")
    }
    const searchList = () => {
      // console.log(state.searchInfo);
      store.commit("searchMut", state.searchInfo);
    };
    return {
      ...toRefs(state),
      goHome,
      searchList,
      goAbout,
      goManage,
      goImg,
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 992px) {
  ul {
    backdrop-filter: blur(4px);
    margin-top: 20px;
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    li {
      /* box-shadow: 10px -10px 20px rgba(0, 0, 0, 0.2),
    -10px 10px 20px rgba(255, 255, 255, 0.1); */
    
      width: 100%;
      text-align: center;
      display: block;
      margin-top: 0px;
      padding: 10px 0;

      // background-color: red;
    }
  }
}

@media screen and (min-width: 993px) {
  .out {
  }
  .inner {
    position: fixed;
    top: 30px;
    left: 1%;
  }
  ul {
    li {
      backdrop-filter: blur(4px);
      width: 160px;
      text-align: center;
      display: block;
      margin-top: 80px;
      padding: 15px 0;
      border-radius: 5px;
      // background-color: red;
    }
  }
}

.out {
  width: 100%;

  .inner {
    ul {
      width: 100%;
      li {
        /* width: 100%;
        text-align: center;
        display: block;
        margin-top: 50px;
        padding: 10px 0;
        background-color: red; */
        
        background-color: rgba($color: white, $alpha: 0.4);
        // background-color: rgba($color: #6b808e, $alpha: 0.5);
        color: white;
        font-size: 20px;
        transition: color 0.5s;
        .iconfont {
          font-size: 20px;
          margin-right: 5px;
        }
        .more {
          padding: 4px 40px;
          color: white;
          font-size: 20px;
          transition: color 0.5s;
          /* el-dropdown-item:hover {
            color: #337dbc!important;
            background-color: #EBF2F8!important;
          } */
        }
        .more:hover {
          color: #ffa41f;
        }
      }
    }

    ul li:hover {
      color: #ffa41f;
    }
    .active {
      color: #ffa41f;
    }
  }
}

/* .example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
} */
</style>