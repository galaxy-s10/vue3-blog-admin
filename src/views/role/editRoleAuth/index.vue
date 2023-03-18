<template>
  <div>
    <h-form
      ref="formRef"
      v-bind="formConfig"
      v-model="formData"
      :show-action="showAction"
      :confirm-loading="confirmLoading"
    ></h-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';

import HForm from '@/components/Base/Form';

import { formConfig } from './config/form.config';

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
    const formConfigRes = ref();
    onBeforeMount(async () => {
      formConfigRes.value = await formConfig();
    });

    const validateForm = async () => {
      const res = await formRef.value.handleValidate();
      return res;
    };

    return {
      formRef,
      formConfig: formConfigRes,
      formData,
      confirmLoading,
      validateForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
