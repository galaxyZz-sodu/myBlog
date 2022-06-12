<template>
  <div class="out">
    <div class="li">
      <div class="title">
        {{ listData.title }}
      </div>

      <div class="content">
        <v-md-preview :text="listData.content"></v-md-preview>
      </div>

      <div class="commentList">
        <ul>
          <h2>评论</h2>

          <div class="user" v-if="!loginUserName">
            <div class="reg">
              <el-button text @click="dialogFormVisible = true"
                >登录以发表评论</el-button
              >

              <el-dialog v-model="dialogFormVisible" title="登录">
                <el-form :model="form">
                  <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.user_name" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.user_password" autocomplete="off" />
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                      >取消</el-button
                    >
                    <el-button type="primary" @click="login">登录</el-button>
                  </span>
                </template>
              </el-dialog>
            </div>

            <div>或</div>
            <div class="log">
              <el-button text @click="dialogFormVisible2 = true"
                >注册</el-button
              >

              <el-dialog v-model="dialogFormVisible2" title="注册">
                <el-form :model="form">
                  <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input
                      v-model="form.user_name"
                      autocomplete="off"
                      placeholder="不超过10个字符"
                    />
                  </el-form-item>
                  <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input
                      v-model="form.user_password"
                      autocomplete="off"
                      placeholder="不超过20个字符"
                    />
                  </el-form-item>
                  <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input
                      v-model="confirnPassword"
                      autocomplete="off"
                      placeholder="不超过20个字符"
                    />
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false"
                      >取消</el-button
                    >
                    <el-button type="primary" @click="register">注册</el-button>
                  </span>
                </template>
              </el-dialog>
            </div>
          </div>

          <div class="user2" v-if="loginUserName">
            <div class="loginName">
              <span class="iconfont icon-203yonghu_yonghu4"></span
              >{{ loginUserName }}
            </div>
            <div class="loginOut" @click="logOut">退出登录</div>
          </div>

          <el-form-item>
            <el-input v-model="commentInfo.content" type="textarea" />
            <el-button
              @click="insertCommentList"
              style="margin-top: 10px"
              type="primary"
              plain
              :disabled="!commentInfo.content || !loginUserName"
              >发表评论</el-button
            >
          </el-form-item>

          <li v-for="item in commentList" :key="item.id">
            <div class="name">{{ item.userName }}</div>
            <div class="content">
              {{ item.content }}
            </div>
            <div class="time">{{ item.time }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, inject, ref } from "vue";
import { postComment, insertComment } from "@/http/comment";
import { postRegister, postLogin } from "@/http/user";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const dialogFormVisible = ref(false);
    const dialogFormVisible2 = ref(false);
    const formLabelWidth = "140px";
    const form = reactive({
      user_id: "",
      user_name: "",
      user_password: "",
    });
    const state = reactive({
      count: 0,
      listData: [],
      commentList: [],
      confirnPassword: "",
      loginUserName: "",
      loginUserId: "",
    });

    const commentInfo = reactive({
      id: "",
      articalId: "",
      content: "",
      time: "",
      userId: "",
      userName: "",
    });

    const insertCommentList = () => {
      commentInfo.id = uuid();
      commentInfo.articalId = state.listData.id;
      commentInfo.time = getNowTime();
      commentInfo.userId = state.loginUserId;
      commentInfo.userName = state.loginUserName;
      // console.log(commentInfo)

      insertComment(commentInfo).then((res) => {
        // console.log(res);
        
          /* ElMessage({
          message: res.data.msg,
          type: "success",
        }); */
        
        /* else if(res.data.code == 2) {
          ElMessage.error(res.data.msg);
        } */
        
        commentInfo.content = "";
        +
        self.location.reload();
      }, (rej) => {
        ElMessage.error('用户信息失效，请重新登录');
      });

      // reload()
    };

    const getNowTime = () => {
      var date = new Date();

      var year = date.getFullYear(); //年 ,从 Date 对象以四位数字返回年份
      var month = date.getMonth() + 1; //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
      var day = date.getDate(); //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)

      var hours = date.getHours(); //小时 ,返回 Date 对象的小时 (0 ~ 23)
      var minutes = date.getMinutes(); //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
      var seconds = date.getSeconds(); //秒 ,返回 Date 对象的秒数 (0 ~ 59)

      //获取当前系统时间
      // var currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

      //修改月份格式
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }

      //修改日期格式
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }

      //修改小时格式
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }

      //修改分钟格式
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }

      //修改秒格式
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }

      //获取当前系统时间  格式(yyyy-mm-dd hh:mm:ss)
      var currentFormatDate =
        year + "-" + month + "-" + day + " " + hours + ":" + minutes;
      return currentFormatDate;
    };

    const login = () => {
      postLogin(form).then((res) => {
        console.log(res);
        if (res.data.code == 2) {
          ElMessage.error(res.data.msg);
          return;
        } else if (res.data.code == 0) {
          state.loginUserName = res.data.list[0].user_name;
          state.loginUserId = res.data.list[0].user_id;
          // console.log('token', res.data.token)
          // console.log(state.loginUserName);
          form.user_name = "";
          form.user_password = "";
          localStorage.setItem("userName", state.loginUserName);
          localStorage.setItem("userId", state.loginUserId);
          localStorage.setItem("token", res.data.token);
          dialogFormVisible.value = false;
          ElMessage({
            message: "登录成功！",
            type: "success",
          });
          self.location.reload();
        }
      });
    };

    const register = () => {
      if (form.user_password != state.confirnPassword) {
        ElMessage.error("两次输入的密码不相同");
        return;
      }
      form.user_id = uuid();
      postRegister(form).then((res) => {
        form.user_name = "";
        form.user_password = "";
        state.confirnPassword = "";
        dialogFormVisible2.value = false;
        ElMessage({
          message: "用户注册成功",
          type: "success",
        });
      });
    };

    const uuid = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    };

    const logOut = () => {
      localStorage.removeItem("userName", "userId");
      self.location.reload();
    };
    onMounted(() => {
      state.listData = JSON.parse(localStorage.getItem("data"));
      window.scrollTo(0, 0);
      // console.log("detail", state.listData);
      postComment(state.listData).then((res) => {
        // console.log(res);
        state.commentList = res.data.list;
        // console.log(state.commentList);
      });
      state.loginUserName = localStorage.getItem("userName");
      state.loginUserId = localStorage.getItem("userId");
    });

    return {
      ...toRefs(state),
      insertCommentList,
      commentInfo,
      uuid,
      getNowTime,
      dialogFormVisible,
      dialogFormVisible2,
      formLabelWidth,
      form,
      login,
      register,
      logOut,
    };
  },
};
</script>

<style lang="scss" scoped>
/* .markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	} */
.out {
  .li {
    margin: 20px 0;
    padding: 20px 10px;
    background-color: rgba($color: white, $alpha: 0.4);
    backdrop-filter: blur(4px);
    border-radius: 5px;
    .title {
      margin: 0 15px;
      font-size: 30px;
      color: white;
    }

    .content {
      margin-top: 10px;
      // font-size: 16px;
      background-color: white;
      margin-bottom: 10px;
      border-radius: 5px;
    }

    .commentList {
      // border-top: 1px solid #ffa41f;
      padding: 5px 0;
      h2 {
        color: #ffa41f;
        padding: 0 10px;
      }
      .user {
        width: 220px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .user2 {
        width: 130px;
        padding-left: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .loginName {
          font-size: 18px;
          color: #337dbc;
          .iconfont {
            margin-right: 2px;
          }
        }
        .loginOut {
          transition: color 0.5s;
        }
        .loginOut:hover {
          color: #ffa41f;
        }
      }
      li {
        padding: 10px 20px;
        margin-bottom: 10px;
        border-radius: 5px;
        width: 100%;
        background-color: white;
        .name {
          font-size: 18px;
          color: #ffa41f;
        }
        .content {
          font-size: 15px;
          margin-bottom: 10px;
        }
        .time {
          color: #7f7f7f;
          font-size: 10px;
        }
      }
    }
  }
}
</style>