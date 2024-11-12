<template>
  <n-spin :show="appLoading">
    <div class="app-wrap">
      <router-view></router-view>
    </div>
    <SwitchEnvCpt></SwitchEnvCpt>
  </n-spin>
</template>

<script lang="ts" setup>
import VConsole from 'vconsole';
import { toRef } from 'vue';

import SwitchEnvCpt from '@/components/SwitchEnv/index.vue';
import { loginMessage } from '@/hooks/use-login';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const appLoading = toRef(appStore, 'loading');
loginMessage();
function handleVConsole() {
  const vConsole = new VConsole();
  console.log(vConsole);
}
// handleVConsole();
console.log(window.location.href);
</script>

<style lang="scss" scoped>
.app-wrap {
  min-height: 100vh;
}
</style>
