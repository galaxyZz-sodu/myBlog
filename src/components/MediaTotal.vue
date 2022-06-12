<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="管理图片" name="first"><manage-img/></el-tab-pane>
      <el-tab-pane label="管理视频" name="second"><ManageVideo/></el-tab-pane>
      <!-- <el-tab-pane label="管理评论" name="third"><comment/></el-tab-pane> -->
      <!-- <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { ref } from "vue";
import ManageImg from '@/components/manageImg.vue'
import ManageVideo from  '@/components/Video.vue'


export default {
    components: {ManageImg, ManageVideo},
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