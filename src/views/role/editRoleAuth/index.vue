<template>
  <HForm
    v-bind="formConfigRes"
    v-model="formData"
    :show-action="showAction"
    :confirm-loading="confirmLoading"
  ></HForm>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

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
const formConfigRes = ref();
onBeforeMount(async () => {
  formConfigRes.value = await formConfig();
});
</script>

<style lang="scss" scoped></style>
