<template>
  <div>
    <h-form
      ref="formRef"
      v-bind="formConfig"
      v-model="formData"
      :show-action="showAction"
      :confirm-loading="confirmLoading"
      @click:confirm="handleConfirm"
      @update:filed="updateFiled"
    ></h-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import { fetchUpdateArticle, fetchCreateArticle } from '@/api/article';
import HForm from '@/components/Base/Form';
import { IArticle } from '@/interface';

import { formConfig } from '../config/form.config';

import type { UploadFileInfo } from 'naive-ui';

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
    const handleData = ref();
    if (props.modelValue?.head_img) {
      handleData.value = {
        ...props.modelValue,
        head_img: [
          {
            id: props.modelValue.head_img,
            name: props.modelValue.head_img,
            url: props.modelValue.head_img,
            status: 'finished',
            percentage: 100,
          },
        ] as UploadFileInfo[],
      };
    } else {
      handleData.value = {
        ...props.modelValue,
        head_img: [] as UploadFileInfo[],
      };
    }
    const formData = ref<IArticle>(handleData.value);
    const confirmLoading = ref(false);
    const formRef = ref<any>(null);
    const qiniuCdnList = ref<string[]>([]);
    const formConfigRes = ref();
    const route = useRoute();
    const reg =
      /https:\/\/resource\.hsslive\.cn\/image\/.+?(jpg|jpeg|png|gif|webp)/gim;

    onBeforeMount(async () => {
      formConfigRes.value = await formConfig();
    });
    const updateFiled = (filed, value) => {
      if (filed === 'content') {
        const str: string = value;
        const arr = str.match(reg);
        if (Array.isArray(arr)) {
          qiniuCdnList.value = [
            ...new Set([...new Set(qiniuCdnList.value), ...new Set(arr)]),
          ];
        }
      }
    };
    const handleConfirm = async (v: IArticle) => {
      try {
        confirmLoading.value = true;
        if (route.query.id) {
          await fetchUpdateArticle({
            title: v.title,
            content: v.content,
            desc: v.desc,
            head_img: v.head_img?.[0]?.resultUrl,
            id: v.id,
            is_comment: v.is_comment,
            status: v.status,
            tags: v.tags,
            types: v.types,
            priority: v.priority,
          });
          window.$message.success('更新成功');
        } else {
          await fetchCreateArticle({
            title: v.title,
            content: v.content,
            desc: v.desc,
            head_img: v.head_img?.[0]?.resultUrl,
            is_comment: v.is_comment,
            status: v.status,
            tags: v.tags,
            types: v.types,
            priority: v.priority,
          });
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
      updateFiled,
      validateForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
