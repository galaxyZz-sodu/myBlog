<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <el-scrollbar height="600px">
            <ul class="infinite-list" style="overflow: auto">
              <li
                v-for="i in listData"
                :key="i.id"
                class="infinite-list-item left"
                @click="handlerComment(i)"
                :class="i.id == activeVal ? 'activeCol' : ''"
              >
                {{ i.title }}
              </li>
            </ul>
          </el-scrollbar>
        </el-aside>
        <el-main style="padding-top: 0">
          <el-scrollbar height="600px">
            <ul class="infinite-list" style="overflow: auto">
              <li
                v-for="i in commentList"
                :key="i.id"
                class="infinite-list-item right"
              >
                <div>
                  <div class="name">{{i.userName}}</div>
                  <div class="content">{{ i.content }}</div>
                  <div class="time">{{ i.time }}</div>
                </div>

                <el-popconfirm
                  title="确定要删除这条评论？"
                  @confirm="deleteComment(i)"
                  confirm-button-text="确定"
                  cancel-button-text="还是算了"
                >
                  <template #reference>
                    <el-button type="danger" plain>删除评论</el-button>
                  </template>
                </el-popconfirm>
              </li>
            </ul>
          </el-scrollbar>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, toRaw, ref } from "vue";
import { useStore } from "vuex";
import { postComment, postDeleteComment } from "@/http/comment";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const store = useStore();
    const count = ref(0);
    const state = reactive({
      commentList: [],
      activeVal: "",
    });
    /* const activeVal = computed(() => {
        state.commentList[0].articalId
    }) */
    const load = () => {
      count.value += 2;
    };
    const listData = computed(() => store.state.listData2);
    const handlerComment = (item) => {
        state.activeVal = item.id
      postComment(item).then((res) => {
        // console.log(res);
        state.commentList = res.data.list;
        // state.activeVal = state.commentList[0].articalId;
      });
    };
    const deleteComment = (item) => {
      postDeleteComment(toRaw(item)).then(() => {
        ElMessage("评论已删除");
      });
    };
    return {
      ...toRefs(state),
      listData,
      handlerComment,
      load,
      count,
      deleteComment,
    };
  },
};
</script>

<style lang="scss" scoped>
.common-layout {
  height: 600px;
  padding: 10px 20px;
  ul {
    
    .left {
      // height: 50px;
      background-color: white;
      line-height: 25px;
      padding: 8px 30px;
      color: #337dbc;
      font-size: 15px;
      margin-bottom: 10px;
      border-radius: 5px;
      transition: color 0.3s, background-color 0.3s;
    }
    .left:hover {
      background-color: #EBF2F8;
    }
    .right {
      // height: 70px;
      background-color: white;
      padding: 0 15px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      .name {
        font-size: 18px;
        color: #337dbc;
        margin: 5px 0;
      }
      .content {
        font-size: 15px;
        margin-bottom: 5px;
      }
      .time {
        font-size: 10px;
        color: #7f7f7f;
        margin-bottom: 5px;
      }
    }
    .activeCol {
      background-color: #337dbc !important;
      color: white !important;
    }
  }
}
</style>