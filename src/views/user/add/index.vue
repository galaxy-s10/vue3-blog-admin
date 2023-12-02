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

import { fetchCreateType } from '@/api/type';
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
    const { message }: any = await fetchCreateType({
      name: v.name,
    });
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
