<template>
  <div>
    <div v-if="env === 'beta'">
      <div class="beta-watermark">欢迎体验测试服~</div>
    </div>
    <div class="switch-env">
      <div @click="switchEnv(env === 'beta' ? 'prod' : 'beta')">
        <span>当前是{{ parseEnv(env) }}，</span>
        <span>点击切换{{ env === 'beta' ? '正式服' : '测试服' }}</span>
      </div>
      <div v-if="isDev" @click="switchEnv('development')">
        点击切换本地开发环境
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { useRouter } from 'vue-router';

import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import cache from '@/utils/cache';
export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const env = toRef(appStore, 'env');
    const hasEnv = cache.getStorageExp('env');
    const isDev = process.env.NODE_ENV === 'development';

    const parseEnv = (env) => {
      switch (env) {
        case 'beta':
          return '测试服';
        case 'prod':
          return '正式服';
        default:
          return '本地开发环境';
      }
    };

    if (hasEnv) {
      appStore.setEnv(hasEnv);
    } else {
      cache.setStorageExp('env', env.value, 24);
    }

    const switchEnv = (env) => {
      switch (env) {
        case 'beta':
          appStore.setEnv('beta');
          break;
        case 'prod':
          appStore.setEnv('prod');
          break;
        case 'development':
          appStore.setEnv('development');
          break;
      }
      window.$message.success('切换成功!');
      userStore.logout();
      router.push('/login');
    };
    return { env, isDev, switchEnv, parseEnv };
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
  font-size: 20px;
  cursor: pointer;
}
</style>
