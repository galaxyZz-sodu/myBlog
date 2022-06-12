<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="新建博客" name="first"><write/></el-tab-pane>
      <el-tab-pane label="删除博客" name="second"><delete/></el-tab-pane>
      <el-tab-pane label="管理评论" name="third"><comment/></el-tab-pane>
      <!-- <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { ref } from "vue";
// import type { TabsPaneContext } from "element-plus";
import  Write  from "@/components/Write.vue";
import Delete from '@/components/DeletBlog.vue'
import Comment from '@/components/Comment.vue'

export default {
    components: {Write, Delete, Comment},
  setup() {
    const state = reactive({
      count: 0,
    });
    const activeName = ref("first");

    const handleClick = (tab, event) => {
      console.log(tab, event);
    };
    return {
      ...toRefs(state),
      activeName,
      handleClick
    };
  },
};
</script>

<style lang="scss" scoped>
</style>