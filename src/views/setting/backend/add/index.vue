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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

import { fetchCreateBackend, fetchUpdateBackend } from '@/api/backend';
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
    const route = useRoute();
    const handleConfirm = async (v) => {
      try {
        confirmLoading.value = true;
        if (route.query.id) {
          await fetchUpdateBackend({
            id: v.id,
            key: v.key,
            value: v.value,
            type: v.type,
            desc: v.desc,
          });
          window.$message.success('更新成功');
        } else {
          const { message }: any = await fetchCreateBackend(v);
          window.$message.success(message);
        }
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
    };
  },
});
</script>

<style lang="scss" scoped></style>
