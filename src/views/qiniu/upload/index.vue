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

    // 根据文件内容获取hash，同一个文件不管重命名还是改文件名后缀，hash都一样
    const getHash = (file: File) => {
      return new Promise<{
        hash: any;
        suffix: string;
        buffer: string | ArrayBuffer | null;
        filename: string;
      }>((resolve) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
          const spark = new sparkMD5.ArrayBuffer();
          const buffer = e.target!.result;
          spark.append(buffer);
          const hash = spark.end();
          const suffix = file.name.split('.')[1];
          const info = { hash, suffix, buffer, filename: `${hash}.${suffix}` };
          resolve(info);
        };
      });
    };

    const handleConfirm = async (v) => {
      const formVal = { ...v };
      const files = formVal.uploadFiles;
      try {
        const form = new FormData();
        Object.keys(formVal).forEach((key) => {
          key !== 'uploadFiles' && form.append(key, formVal[key]);
        });
        files.forEach((item) => {
          form.append('uploadFiles', item.file);
        });
        confirmLoading.value = true;
        const res = await getHash(files[0].file);
        form.append('hash', res.hash);
        console.log(res, 2222222);
        formData.value.prefix = '/image';
        formData.value.uploadFiles = [
          {
            id: 'item',
            name: 'item',
            url: 'https://resource.hsslive.cn/image/1582472959525git.webp',
            status: 'uploading',
            percentage: 20,
          },
        ] as UploadFileInfo[];
        return;
        const { message, data }: any = await fetchUpload(form);
        window.$message.success(message);
        uploadRes.value = data;
      } catch (error) {
        console.log(error);
      } finally {
        confirmLoading.value = false;
      }
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
