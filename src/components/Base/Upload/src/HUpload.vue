<template>
  <div class="upload-wrap">
    <n-upload
      v-model:file-list="list"
      multiple
      directory-dnd
      @change="handleUploadChange"
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

import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui';

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
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const list = ref<UploadFileInfo[]>([
      // {
      //   id: 'url-test',
      //   name: 'URL 测试',
      //   url: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f',
      //   status: 'finished',
      // },
    ]);
    watch(
      // @ts-ignore
      () => props.modelValue,
      (val) => {
        if (val === null) list.value = [];
      }
    );
    const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
      list.value = data.fileList;
      console.log(list.value, 222);
      emit('update:value', list.value);
    };

    return {
      list,
      handleUploadChange,
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
