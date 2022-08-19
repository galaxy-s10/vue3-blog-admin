<template>
  <div>
    <h-form
      v-if="Object.keys(formData).length"
      ref="formRef"
      v-bind="formConfig"
      v-model="formData"
      :show-action="true"
      :confirm-loading="confirmLoading"
      @click:confirm="handleConfirm"
    ></h-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue';

import { formConfig } from '../config/form.config';

import { fetchFrontendDetail, fetchUpdateFrontend } from '@/api/frontend';
import HForm from '@/components/Base/Form';
export default defineComponent({
  components: { HForm },
  props: {},
  setup() {
    const formData = ref({});
    const oldFormData = ref<any>({});
    const confirmLoading = ref(false);
    const formRef = ref<any>(null);
    const formConfigRes = ref();

    onMounted(async () => {
      const { data } = await fetchFrontendDetail();
      formData.value = data.frontend;
      oldFormData.value = data.frontend;
    });
    onBeforeMount(() => {
      formConfigRes.value = formConfig();
    });
    const handleConfirm = async (v) => {
      try {
        confirmLoading.value = true;
        await fetchUpdateFrontend({
          id: oldFormData.value.id,
          frontend_about: v.frontend_about,
          frontend_comment: v.frontend_comment,
          frontend_link: v.frontend_link,
          frontend_qq_login: v.frontend_qq_login,
          frontend_github_login: v.frontend_github_login,
          frontend_email_login: v.frontend_email_login,
          frontend_dialog: v.frontend_dialog,
          frontend_dialog_content: v.frontend_dialog_content,
        });
        window.$message.success('更新成功');
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
