<template>
  <div class="fixed-powered">
    <span class="txt">Powered by</span>
    <span class="author" @click="jumpToUrl">galaxy-s10</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { GITHUB_REPO } from '@/constant';
export default defineComponent({
  components: {},
  setup() {
    const jumpToUrl = () => {
      window.open(GITHUB_REPO);
    };

    return { jumpToUrl };
  },
});
</script>

<style lang="scss" scoped>
.fixed-powered {
  width: 100%;
  position: fixed;
  bottom: 0;
  color: #9373ee;
  background-color: rgba(147, 115, 238, 0.04);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  user-select: none;
  .txt {
  }
  .author {
    font-weight: bold;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
