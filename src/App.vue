<template>
  <n-spin :show="appLoading">
    <div class="app-wrap">
      <router-view></router-view>
    </div>
    <SwitchEnvCpt></SwitchEnvCpt>
  </n-spin>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';

import SwitchEnvCpt from '@/components/SwitchEnv/index.vue';
import { loginMessage } from '@/hooks/use-login';
import { useAppStore } from '@/store/app';

export default defineComponent({
  components: { SwitchEnvCpt },
  setup() {
    const appStore = useAppStore();
    const appLoading = toRef(appStore, 'loading');
    loginMessage();
    return { appLoading };
  },
});
</script>

<style lang="scss" scoped>
.app-wrap {
  min-height: 100vh;
}
</style>
