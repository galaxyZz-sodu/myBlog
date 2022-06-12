<template>
  <div class="out">
    <el-scrollbar height="600px">
      <div class="li">
        <el-form :model="form" label-width="120px">
          <el-form-item label="文章标题">
            <el-input v-model="form.title" />
          </el-form-item>

          <el-form-item label="文章说明">
            <el-input v-model="form.introduce" type="textarea" />
          </el-form-item>

          <el-form-item label="文章创建日期">
            <el-col :span="11">
              <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="正文:">
            <v-md-editor v-model="form.content" height="400px"></v-md-editor>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="
                !form.title || !form.introduce || !form.time || !form.content
              "
              >提交</el-button
            >
            <el-button @click="goHome">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { postInsertList } from "@/http/list";
import { toRaw } from "@vue/reactivity";
import { useRouter } from "vue-router";
// import { h } from "vue";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      count: 0,
    });

    const form = reactive({
      id: "",
      title: "",
      content: "",
      time: "",
      introduce: "",
    });

    const onSubmit = () => {
      // form.content = form.content.replace(/\r|\n/ig,"")
      form.id = uuid();
      // console.log(toRaw(form));
      postInsertList(toRaw(form)).then((res) => {});
      ElMessage({
        message: "博客新建成功！",
        type: "success",
      });
    };

    const goHome = () => {
      router.replace("/");
    };

    onMounted(() => {
      window.scrollTo(0, 0);
    });

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

    return {
      ...toRefs(state),
      uuid,
      form,
      onSubmit,
      goHome,
      router,
    };
  },
};
</script>

<style lang="scss" scoped>
.out {
}
</style>