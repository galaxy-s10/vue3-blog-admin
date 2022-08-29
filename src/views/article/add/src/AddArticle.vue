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

import { formConfig } from '../config/form.config';

import { fetchUpdateArticle, fetchCreateArticle } from '@/api/article';
import { fetchDeleteQiniuDataByQiniuKey, fetchUpload } from '@/api/qiniuData';
import HForm from '@/components/Base/Form';
import { QINIU_CDN_URL, QINIU_PREFIX } from '@/constant';
import { IArticle } from '@/interface';

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
    const formData = ref<IArticle>({ ...props.modelValue });
    const originData: IArticle = { ...props.modelValue };
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
      // console.log('updateFiled', filed, value);
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
    const uploadImg = async (files: any[]) => {
      console.log('上传新的封面图');
      const formVal = { prefix: QINIU_PREFIX['image/'] };
      const form = new FormData();
      Object.keys(formVal).forEach((key) => {
        key !== 'uploadFiles' && form.append(key, formVal[key]);
      });
      files.forEach((item) => {
        form.append('uploadFiles', item.file);
      });
      const { data } = await fetchUpload(form);
      const success = data.success;
      return success[0].resultFilename;
    };
    const handleConfirm = async (v: IArticle) => {
      console.log(v, 444, v.head_img, v.title, originData.head_img);
      // console.log(originData.head_img![0].replace(QINIU_CDN_URL, ''));
      // return;
      try {
        confirmLoading.value = true;
        if (route.query.id) {
          if (v.head_img![0] !== originData.head_img![0]) {
            console.log('修改了封面图');
            if (originData.head_img![0]) {
              console.log('先删除旧封面图');
              const qiniu_key = originData.head_img![0].replace(
                QINIU_CDN_URL,
                ''
              );
              await fetchDeleteQiniuDataByQiniuKey(qiniu_key);
            } else {
              console.log('原本没有封面图');
            }
            if (v.head_img![0]) {
              console.log('上传新的封面图');
              v.head_img = await uploadImg(v.head_img as any[]);
            } else {
              v.head_img = null;
            }
          } else {
            console.log('没修改封面图');
            v.head_img = v.head_img![0];
          }
          await fetchUpdateArticle({
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
          });
          window.$message.success('更新成功');
        } else {
          if (v.head_img) {
            v.head_img = await uploadImg(v.head_img as any[]);
          }
          await fetchCreateArticle({
            title: v.title,
            content: v.content,
            desc: v.desc,
            head_img: v.head_img,
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
