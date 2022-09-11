<template>
  <div>
    <h-form
      ref="formRef"
      v-bind="formConfig"
      v-model="formData"
      :show-action="showAction"
      :confirm-loading="confirmLoading"
      @click:confirm="handleConfirm"
    ></h-form>
    <div v-if="uploadRes?.success.length">
      <h3>success:</h3>
      <div v-for="(item, index) in uploadRes?.success" :key="index">
        源文件名: {{ item.original.filename }}，CDN文件名:
        {{ item.url }}
      </div>
    </div>
    <div v-if="uploadRes?.error.length">
      <h3>error:</h3>
      <div v-for="(item, index) in uploadRes?.error" :key="index">
        源文件名: {{ item.originalFilename }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import sparkMD5 from 'spark-md5';
import { defineComponent, ref } from 'vue';

import { formConfig } from './config/form.config';

import type { UploadFileInfo } from 'naive-ui';

import { fetchUpload } from '@/api/qiniuData';
import HForm from '@/components/Base/Form';

export default defineComponent({
  components: { HForm },
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
    showAction: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const formData = ref({ ...props.modelValue });
    const confirmLoading = ref(false);
    const formRef = ref<any>(null);
    const uploadRes = ref();

    const handleConfirm = (v) => {
      console.log('handleConfirm', v);
    };

    const validateForm = async () => {
      const res = await formRef.value.handleValidate();
      return res;
    };

    return {
      formRef,
      formConfig,
      formData,
      confirmLoading,
      handleConfirm,
      validateForm,
      uploadRes,
    };
  },
});
</script>

<style lang="scss" scoped></style>
