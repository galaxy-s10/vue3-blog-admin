<template>
  <HForm
    ref="hFormRef"
    v-bind="formConfig"
    v-model="formData"
    :show-action="showAction"
    :confirm-loading="confirmLoading"
    @click:confirm="handleConfirm"
  ></HForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { fetchCreateWorks } from '@/api/works';
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

const hFormRef = ref<InstanceType<typeof HForm>>();
const formData = ref({ ...props.modelValue });
const confirmLoading = ref(false);

defineExpose({
  validateForm,
  validateAndUpload,
});

const handleConfirm = async (v) => {
  try {
    confirmLoading.value = true;
    if (v.bg_url[0]?.resultUrl) {
      v.bg_url = v.bg_url[0]?.resultUrl;
    } else {
      v.bg_url = '';
    }
    const { message }: any = await fetchCreateWorks(v);
    window.$message.success(message);
  } catch (error) {
    console.log(error);
  } finally {
    confirmLoading.value = false;
  }
};

async function validateForm() {
  const res = await hFormRef.value?.handleValidate();
  return res;
}
async function validateAndUpload() {
  const res = await hFormRef.value?.validateAndUpload();
  return res;
}
</script>

<style lang="scss" scoped></style>
