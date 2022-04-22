<template>
  <div class="setting-theme-wrap">
    <h1>当前在线的主题配置</h1>
    <div class="flex">
      <div class="content light">
        <div class="text">浅色主题</div>
        <div class="primary">primary</div>
      </div>
      <div class="content dark">
        <div class="text">暗黑主题</div>
        <div class="primary">primary</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup() {},
});
</script>

<style lang="scss" scoped>
.setting-theme-wrap {
  .flex {
    display: flex;
    .content {
      width: 300px;
      height: 300px;
      .primary {
        background-color: var(--theme-color-primary);
      }
      &.light {
        background-color: var(--bg-color-light);
        color: var(--text-color-light);
      }
      &.dark {
        background-color: var(--bg-color-dark);
        color: var(--text-color-dark);
      }
    }
  }
}
</style>
