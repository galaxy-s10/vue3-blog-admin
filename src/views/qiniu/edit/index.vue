<template>
  <HForm
    v-bind="formConfig"
    v-model="formData"
    :show-action="showAction"
  ></HForm>
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
</script>

<style lang="scss" scoped></style>
