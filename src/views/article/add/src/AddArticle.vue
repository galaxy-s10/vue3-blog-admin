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
        if (route.query.id) {
          await fetchUpdateArticle(
            deleteUselessObjectKey({
              title: v.title,
              content: v.content,
              desc: v.desc,
              head_img: v.head_img,
              id: v.id,
              is_comment: v.is_comment,
              status: v.status,
              tags: v.tags,
              types: v.types,
              priority: v.priority,
            })
          );
          window.$message.success('更新成功');
        } else {
          await fetchCreateArticle(
            deleteUselessObjectKey({
              title: v.title,
              content: v.content,
              desc: v.desc,
              head_img: v.head_img,
              is_comment: v.is_comment,
              status: v.status,
              tags: v.tags,
              types: v.types,
              priority: v.priority,
            })
          );
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
