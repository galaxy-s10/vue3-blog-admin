<template>
  <div>
    <n-button
      v-auth="USER_ROLE.SUPER_ADMIN"
      type="error"
      :loading="isLoading"
      @click="handleInvoke"
    >
      重启所有pm2任务
    </n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { fetchRestartPm2 } from '@/api/schedule';
import { USER_ROLE } from '@/constant';

const isLoading = ref(false);
const ajaxFetchInvokeDbJob = async () => {
  try {
    isLoading.value = true;
    const res: any = await fetchRestartPm2();
    if (res.code === 200) {
      isLoading.value = false;
      window.$message.success('开始执行重启pm2，请稍等');
    } else {
      Promise.reject(res);
      isLoading.value = false;
    }
  } catch (err) {
    Promise.reject(err);
    isLoading.value = false;
  }
};

const handleInvoke = async () => {
  await ajaxFetchInvokeDbJob();
};
</script>

<style lang="scss" scoped></style>
