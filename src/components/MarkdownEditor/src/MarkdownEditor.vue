<template>
  <div class="mardown-wrap">
    <v-md-editor
      v-model="text"
      height="600px"
      @change="handleChange"
    ></v-md-editor>
  </div>
</template>

<script lang="ts">
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import VMdEditor from '@kangc/v-md-editor';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import { defineComponent, ref, watch } from 'vue';
hljs.registerLanguage('json', json);
hljs.registerLanguage('javascript', javascript);

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
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

    watch(
      () => props.modelValue,
      (val) => {
        if (val === null) text.value = '';
      }
    );
    const handleChange = (str, html) => {
      text.value = str;
      emit('update:value', str);
    };
    return { text, handleChange };
  },
});
</script>

<style lang="scss" scoped>
.mardown-wrap {
  width: 100%;
}
</style>
