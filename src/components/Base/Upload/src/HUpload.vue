<template>
  <div class="upload-wrap">
    <n-upload
      v-model:file-list="list"
      multiple
      :max="max"
      directory-dnd
      @change="handleUploadChange"
      @before-upload="beforeUpload"
    >
      <n-upload-dragger>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import type { UploadFileInfo } from 'naive-ui';

export default defineComponent({
  components: {},
  props: {
    modelValue: {
      // type: String,
      // default() {
      //   return '';
      // },
      type: Array,
      default() {
        return [];
      },
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const list = ref<UploadFileInfo[]>(
      // @ts-ignore
      props.modelValue.map((item) => {
        return {
          id: item,
          name: item,
          url: item,
          status: 'finished',
        };
      })
    );

    // watch(
    //   // @ts-ignore
    //   () => props.modelValue,
    //   (val) => {
    //     if (val === null) list.value = [];
    //   }
    // );

    const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
      list.value = data.fileList;
      emit('update:value', list.value);
    };

    const beforeUpload = () => {
      return true;
    };

    return {
      list,
      handleUploadChange,
      beforeUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
.upload-wrap {
  display: flex;
  flex-direction: column;
}
</style>
