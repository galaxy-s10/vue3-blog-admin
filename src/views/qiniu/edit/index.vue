<template>
  <div>
    <h-form
      ref="formRef"
      v-bind="formConfig"
      v-model="formData"
      :show-action="showAction"
    ></h-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { formConfig } from './config/form.config';

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
    const formRef = ref<any>(null);

    const validateForm = async () => {
      const res = await formRef.value.handleValidate();
      return res;
    };

    return {
      formRef,
      formConfig,
      formData,
      validateForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
