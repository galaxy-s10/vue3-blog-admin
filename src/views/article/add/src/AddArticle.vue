<template>
  <HForm
    ref="hFormRef"
    v-bind="formConfigRes"
    v-model="formData"
    :show-action="showAction"
    :confirm-loading="confirmLoading"
    @click:confirm="handleConfirm"
    @update:filed="updateFiled"
  ></HForm>
</template>

<script lang="ts" setup>
import { UploadFileInfo } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { fetchCreateArticle, fetchUpdateArticle } from '@/api/article';
import HForm from '@/components/Base/Form';
import { IArticle } from '@/interface';

import { formConfig } from '../config/form.config';

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

const hFormRef = ref<InstanceType<typeof HForm>>();
const formData = ref<IArticle>();
const confirmLoading = ref(false);
const qiniuCdnList = ref<string[]>([]);
const formConfigRes = ref();
const route = useRoute();
const reg =
  /https:\/\/resource\.hsslive\.cn\/image\/.+?(jpg|jpeg|png|gif|webp)/gim;

defineExpose({
  validateForm,
  validateAndUpload,
});

onMounted(async () => {
  if (props.modelValue?.head_img) {
    formData.value = {
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
    formData.value = {
      ...props.modelValue,
      head_img: [] as UploadFileInfo[],
    };
  }
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
