<template>
  <div>
    <h2>当前内存信息</h2>
    <div v-for="(item, index) in cacheInfo" :key="index">
      {{ item }}
    </div>
    <div>
      <n-button :loading="isLoading" @click="refreshMemory">
        刷新内存信息
      </n-button>
      <n-button :loading="isLoading" @click="handleInvoke">
        清除buff/cache
      </n-button>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent, onMounted, ref } from 'vue';

import { fetchShowMemoryJob, fetchInvokeClearMemoryJob } from '@/api/schedule';
export default defineComponent({
  components: {},
  setup() {
    const isLoading = ref(false);
    const cacheInfo = ref([]);
    const ajaxFetchShowMemoryJob = async () => {
      try {
        isLoading.value = true;
        const res: any = await fetchShowMemoryJob();
        if (res.code === 200) {
          isLoading.value = false;
          cacheInfo.value = res.data;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };
    const refreshMemory = async () => {
      await ajaxFetchShowMemoryJob();
    };
    const ajaxFetchInvokeClearMemoryJob = async () => {
      try {
        isLoading.value = true;
        const res: any = await fetchInvokeClearMemoryJob();
        if (res.code === 200) {
          isLoading.value = false;
          window.$message.success(res.message);
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
      await ajaxFetchShowMemoryJob();
    });

    const handleInvoke = async () => {
      await ajaxFetchInvokeClearMemoryJob();
      await refreshMemory();
    };

    return { isLoading, cacheInfo, handleInvoke, refreshMemory, dayjs };
  },
});
</script>

<style lang="scss" scoped></style>
