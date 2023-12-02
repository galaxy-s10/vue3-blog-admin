<template>
  <div>
    <HForm
      v-bind="formConfig"
      v-model="formData"
      :show-action="showAction"
      :confirm-loading="confirmLoading"
    ></HForm>
    <div v-if="uploadRes?.success.length">
      <h3>success:</h3>
      <div
        v-for="(item, index) in uploadRes?.success"
        :key="index"
      >
        源文件名: {{ item.original.filename }}，CDN文件名:
        {{ item.url }}
      </div>
    </div>
    <div v-if="uploadRes?.error.length">
      <h3>error:</h3>
      <div
        v-for="(item, index) in uploadRes?.error"
        :key="index"
      >
        源文件名: {{ item.originalFilename }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import HForm from '@/components/Base/Form';

import { formConfig } from './config/form.config';

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    showAction?: boolean;
  }>(),
  {
    modelValue: {},
    showAction: true,
  }
);
const formData = ref({ ...props.modelValue });
const confirmLoading = ref(false);
const uploadRes = ref();
</script>

<style lang="scss" scoped></style>
