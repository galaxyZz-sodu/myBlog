<template>
  <div>

    <el-scrollbar height="600px">
    <ul>
      <li v-for="item in listData" :key="item.id">
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <div class="time">{{ item.time.substring(0, 10) }}</div>
        </div>

        <el-popconfirm title="确定要删除这篇博客？" @confirm="deleteList(item)" confirm-button-text="确定" cancel-button-text="还是算了">
          <template #reference>
            <el-button type="danger" plain 
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </li>
    </ul>
  </el-scrollbar>

    

  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { postDeleteList } from "@/http/list";
import { toRaw } from "@vue/reactivity";
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'
import {deleteArticalAllComment} from '@/http/comment'
export default {
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });
    const deleteList = (item) => {
      // console.log(item);
      postDeleteList(toRaw(item))
      deleteArticalAllComment(toRaw(item)).then((res) => {
        
        // console.log('删',res)
      })
      ElMessage('博客已被删除')
    };
    const listData = computed(() => store.state.listData2);
    return {
      ...toRefs(state),
      store,
      listData,
      deleteList,
    };
  },
};
</script>

<style lang="scss" scoped>
ul {
  padding: 10px 20px;
  li {
    height: 100px;
    width: 100%;
    background: white;
    padding: 5px 10px;
    // border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 25px;
      color: #337dbc;
      margin-bottom: 10px;
    }
    .time {
      color: #7f7f7f;
    }
  }
}
</style>