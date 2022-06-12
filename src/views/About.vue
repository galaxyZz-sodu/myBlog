<template>
  <div class="out">
    <div class="li">
        还没想好
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });
    onMounted(() => {
        window.scrollTo(0,0);
    })
    
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.out {
  .li {
    margin: 20px 0;
    padding: 20px 10px;
    background-color: rgba($color: white, $alpha: 0.9);
    border-radius: 5px;
  }
}
</style>