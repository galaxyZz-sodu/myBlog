<template>
  <div class="out">
    <div class="li">
      <el-tabs  v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="博客" name="first"><blog-total/></el-tab-pane>
        <!-- <el-tab-pane label="删除博客" name="second"><Delete/></el-tab-pane>
        <el-tab-pane label="管理评论" name="third"><Comment/></el-tab-pane> -->
        <el-tab-pane label="文件" name="fourth"><MediaTotal/></el-tab-pane>
        <el-tab-pane label="管理用户" name="fifth"><User/></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" >
/* import  Write  from "@/components/Write.vue";
import Delete from '@/components/DeletBlog.vue'
import Comment from '@/components/Comment.vue' */
import BlogTotal from '@/components/blogTotal.vue'
import ManageImg from '@/components/manageImg.vue'
import MediaTotal from '@/components/MediaTotal.vue'
import User from '@/components/UserManage.vue'
import { ref, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
export default {
    components: {ManageImg, User, BlogTotal, MediaTotal},
  setup() {
    const activeName = ref("first");
    
    const handleClick = (tab: TabsPaneContext, event: Event) => {
    //   console.log(tab, event);
    };
    onMounted(() => {
      window.scrollTo(0, 0);
    })
    return {
        activeName,
        handleClick
    }
  },
};
</script>
<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.out {
  .li {
    margin: 20px 0;
    padding: 20px;
    
    background-color: rgba($color: white, $alpha: 0.4);
    backdrop-filter: blur(4px);
    border-radius: 5px;
  }
}
</style>