<template>
  <div class="mardown-wrap">
    <v-md-editor
      v-model="text"
      height="600px"
      :disabled-menus="[]"
      @change="handleChange"
      @upload-image="handleUploadImage"
    ></v-md-editor>
  </div>
</template>

<script lang="ts">
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

import VMdEditor from '@kangc/v-md-editor';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { defineComponent, ref, watch } from 'vue';

import { QINIU_PREFIX } from '@/constant';
import { useUpload } from '@/hooks/use-upload';
import { uploadImageByMdEditor } from '@/utils';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('bash', bash);

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

VMdEditor.use(createTodoListPlugin()); // 任务列表
VMdEditor.use(createCopyCodePlugin()); // 快捷复制代码

export default defineComponent({
  components: { VMdEditor },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const text = ref(props.modelValue);
    const allImg = ref<string[]>([]);
    watch(
      () => props.modelValue,
      (val) => {
        if (val === null) text.value = '';
      }
    );
    const handleChange = (str) => {
      text.value = str;
      emit('update:value', str);
    };

    // eslint-disable-next-line
    const handleUploadImage = async (event, insertImage, files) => {
      try {
        // const res = (await uploadImageByMdEditor(files)) as string;
        // console.log(files[0]);
        // return;
        const res: any = await useUpload({
          prefix: QINIU_PREFIX['image/'],
          file: files[0],
        });
        console.log(res, 'lllllll---');
        const img = {
          url: res.resultUrl,
          desc: res.resultUrl,
          // width: 'auto',
          // height: 'auto',
        };
        insertImage(img);
        allImg.value.push(img.url);
      } catch (error: any) {
        console.log(error);
        window.$message.error(error?.message);
      }
    };
    return { text, handleChange, handleUploadImage };
  },
});
</script>

<style lang="scss" scoped>
.mardown-wrap {
  width: 100%;
  & :deep(.github-markdown-body) {
    blockquote {
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
