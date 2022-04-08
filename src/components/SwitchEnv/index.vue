<template>
  <div>
    <div v-if="env === 'beta'">
      <div class="beta-watermark">欢迎体验测试服~</div>
    </div>
    <div class="switch-env" @click="switchEnv">
      点击切换{{ env === 'beta' ? '正式服' : '测试服' }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { useRouter } from 'vue-router';

import { useAppStore } from '@/store/app';
import cache from '@/utils/cache';

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const appStore = useAppStore();
    const env = toRef(appStore, 'env');
    const hasEnv = cache.getStorageExp('env');

    if (hasEnv) {
      appStore.setEnv(hasEnv);
    } else {
      cache.setStorageExp('env', env.value, 24);
    }

    const switchEnv = () => {
      if (env.value === 'beta') {
        appStore.setEnv('prod');
      } else {
        appStore.setEnv('beta');
      }
      router.push('/');
    };
    return { env, switchEnv };
  },
});
</script>

<style lang="scss" scoped>
.beta-watermark {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: red;
  z-index: 9999;
  opacity: 0.1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10vw;
  pointer-events: none;
}
.switch-env {
  position: fixed;
  bottom: 0;
  right: 0;
  color: red;
  z-index: 9999;
  display: flex;
  font-size: 20px;
  cursor: pointer;
}
</style>
