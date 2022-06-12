<template>
  <div class="out">
    <el-scrollbar height="600px">
      <div class="li">
        <ul>
          <li v-for="item in userList" :key="item.user_id">
            <div class="name">{{ item.user_name }}</div>

            <el-popconfirm
              title="确定要删除？"
              @confirm="deleteUser(item)"
              confirm-button-text="确定"
              cancel-button-text="还是算了"
            >
              <template #reference>
                <el-button type="danger" plain style="margin: 10px"
                  >删除用户</el-button
                >
              </template>
            </el-popconfirm>
          </li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { getUser, postDeleteUser, postDeleteUserComment } from "@/http/user";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const state = reactive({
      count: 0,
      userList: [],
    });

    const deleteUser = (item) => {
      postDeleteUser(item)
        .then((res) => {
          return postDeleteUserComment(item);
        })
        .then((res) => {
          ElMessage("用户已删除");
        });
    };
    onMounted(() => {
      getUser().then((res) => {
        // console.log(res.data.list);
        state.userList = res.data.list;
      });
    });
    return {
      ...toRefs(state),
      deleteUser,
    };
  },
};
</script>

<style lang="scss" scoped>
.out {
  ul {
    li {
      height: 60px;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      margin-bottom: 10px;
      border-radius: 5px;
      .name {
        font-size: 18px;
        color: #337dbc;
      }
    }
  }
}
</style>