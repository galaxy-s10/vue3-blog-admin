<template>
  <div>
    <n-watermark
      v-if="appStore.env !== 'prod'"
      :content="'当前是' + parseEnv(appStore.env)"
      cross
      fullscreen
      :font-size="16"
      :line-height="16"
      :width="384"
      :height="384"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
    />
    <HModal
      v-model:show="modalVisiable"
      :title="modalTitle"
      @confirm="modalConfirm"
      @cancel="modalCancel"
    >
      选择当前环境：
      <n-radio-group v-model:value="currEnv">
        <n-space>
          <n-radio v-for="env in envList" :key="env.value" :value="env.value">
            {{ env.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </HModal>
    <div class="switch-env">
      <n-button type="info" size="tiny" @click="showModal">切换环境</n-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import HModal from '@/components/Base/Modal';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import cache from '@/utils/cache';
export default defineComponent({
  components: { HModal },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const currEnv = ref(appStore.env);
    const hasEnv = cache.getStorageExp('env');
    const isDev = process.env.NODE_ENV === 'development';
    let modalVisiable = ref(false);
    let modalTitle = ref('切换环境');
    let modalType = ref();
    let envList = [
      {
        value: 'beta',
        label: '测试环境',
      },
      {
        value: 'prod',
        label: '正式环境',
      },
      {
        value: 'development',
        label: '本地开发环境',
      },
    ];
    watch(
      () => appStore.env,
      () => {
        currEnv.value = appStore.env;
      }
    );
    if (!isDev) {
      envList = envList.filter((v) => v.value !== 'development');
    }
    const modalConfirm = () => {
      appStore.setEnv(currEnv.value);
      window.$message.success(`切换${parseEnv(currEnv.value)}环境成功！`);
      modalVisiable.value = false;
      userStore.logout();
      router.push('/login');
    };
    const modalCancel = () => {
      modalVisiable.value = false;
    };
    const parseEnv = (env) => {
      switch (env) {
        case 'beta':
          return '测试环境';
        case 'prod':
          return '正式环境';
        default:
          return '本地开发环境';
      }
    };

    if (hasEnv) {
      appStore.setEnv(hasEnv);
    } else {
      cache.setStorageExp('env', currEnv.value, 24);
    }

    const showModal = () => {
      modalVisiable.value = !modalVisiable.value;
    };
    return {
      appStore,
      currEnv,
      isDev,
      parseEnv,
      modalType,
      modalVisiable,
      modalTitle,
      modalConfirm,
      modalCancel,
      showModal,
      envList,
    };
  },
});
</script>

<style lang="scss" scoped>
.switch-env {
  position: fixed;
  bottom: 0;
  right: 0;
  color: red;
  z-index: 9999;
  cursor: pointer;
}
</style>
