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
import { useRoute } from 'vue-router';

import { fetchCreateFrontend, fetchUpdateFrontend } from '@/api/frontend';
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

defineExpose({
  validateForm,
  validateAndUpload,
});

const route = useRoute();

const hFormRef = ref<InstanceType<typeof HForm>>();
const formData = ref({ ...props.modelValue });
const confirmLoading = ref(false);

const handleConfirm = async (v) => {
  try {
    confirmLoading.value = true;
    if (route.query.id) {
      await fetchUpdateFrontend({
        id: v.id,
        key: v.key,
        value: v.value,
        type: v.type,
        desc: v.desc,
      });
      window.$message.success('更新成功');
    } else {
      const { message }: any = await fetchCreateFrontend(v);
      window.$message.success(message);
    }
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
