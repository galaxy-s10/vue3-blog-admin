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
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import { formConfig } from '../config/form.config';

import { fetchUpdateArticle, fetchCreateArticle } from '@/api/article';
import HForm from '@/components/Base/Form';
import { deleteUselessObjectKey } from '@/utils';
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
    console.log(formData.value, 234235);
    const confirmLoading = ref(false);
    const formRef = ref<any>(null);
    const formConfigRes = ref();
    const route = useRoute();

    onBeforeMount(async () => {
      formConfigRes.value = await formConfig();
    });
    const handleConfirm = async (v) => {
      try {
        confirmLoading.value = true;
        delete v.users;
        delete v.is_star;
        delete v.star_total;
        delete v.comment_total;
        if (route.query.id) {
          await fetchUpdateArticle(deleteUselessObjectKey(v));
          window.$message.success('更新成功');
        } else {
          await fetchCreateArticle(deleteUselessObjectKey(v));
          window.$message.success('新增成功');
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
      formConfig: formConfigRes,
      formData,
      confirmLoading,
      handleConfirm,
      validateForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
