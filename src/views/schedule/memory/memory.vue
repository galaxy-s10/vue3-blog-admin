<template>
  <div>
    <h2>服务器内存使用情况：</h2>
    <div
      v-for="(item, index) in memoryInfo"
      :key="index"
    >
      {{ item }}
    </div>
    <div>
      <n-button
        :loading="isLoading"
        @click="refreshMemory"
      >
        刷新内存信息
      </n-button>
      <n-button
        :loading="isLoading"
        @click="handleInvoke"
      >
        清除buff/cache
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { fetchInvokeClearMemoryJob, fetchShowMemoryJob } from '@/api/schedule';
import { formatMemorySize } from '@/utils';

const isLoading = ref(false);
const memoryInfo = ref();

/**
 * @description: 处理free命令返回的内存信息
 * @param {string} str
 * @return {*}
 */
const handleData = (str: string) => {
  const arr: any = str.match(/\S+/g);

  const mem = 'Mem:';
  const swap = 'Swap:';
  const res: any = [];
  const obj: any = {};

  res.push(arr.splice(0, 6));
  res.push(arr.splice(0, 7));
  res.push(arr.splice(0, arr.length));

  res[0].forEach((key, index) => {
    res[1][index + 1] && (obj[mem + key] = res[1][index + 1]);
    res[2][index + 1] && (obj[swap + key] = res[2][index + 1]);
  });
  return obj;
};

const ajaxFetchShowMemoryJob = async () => {
  try {
    isLoading.value = true;
    const res: any = await fetchShowMemoryJob();
    if (res.code === 200) {
      isLoading.value = false;
      memoryInfo.value = Object.keys(res.data).map((v) => {
        return { [v]: formatMemorySize(Number(res.data[v])) };
      }) as any;
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
</script>

<style lang="scss" scoped></style>
