<template>
  <div>
    <h2>七牛云备份任务：</h2>
    <div v-if="dbJob">
      <div>
        状态:
        {{ dbJob.status === 1 ? '正常' : '异常' }}
      </div>
      <div>
        下次执行任务时间:
        {{
          dbJob.nextInvocation
            ? dayjs(dbJob.nextInvocation).format('YYYY-MM-DD HH:mm:ss')
            : '异常'
        }}
      </div>
      <div>
        <n-button :loading="isLoading" @click="handleInvoke">立即执行</n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent, onMounted, ref } from 'vue';

import { fetchDbJob, fetchInvokeDbJob } from '@/api/schedule';
export default defineComponent({
  components: {},
  setup() {
    const isLoading = ref(false);
    const dbJob = ref();
    const ajaxFetchDbJob = async () => {
      try {
        isLoading.value = true;
        const res: any = await fetchDbJob();
        if (res.code === 200) {
          isLoading.value = false;
          dbJob.value = res.data;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };
    const ajaxFetchInvokeDbJob = async () => {
      try {
        isLoading.value = true;
        const res: any = await fetchInvokeDbJob();
        if (res.code === 200) {
          isLoading.value = false;
          window.$message.success('开始执行备份任务，大约5分钟执行完成');
        } else {
          Promise.reject(res);
          isLoading.value = false;
        }
      } catch (err) {
        Promise.reject(err);
        isLoading.value = false;
      }
    };
    onMounted(async () => {
      await ajaxFetchDbJob();
    });

    const handleInvoke = async () => {
      await ajaxFetchInvokeDbJob();
    };

    return { isLoading, handleInvoke, dbJob, dayjs };
  },
});
</script>

<style lang="scss" scoped></style>
