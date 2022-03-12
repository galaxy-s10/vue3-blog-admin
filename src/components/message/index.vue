<template>
  <div>
    <NMessageProvider>
      <ContentCpt></ContentCpt>
    </NMessageProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NMessageProvider } from 'naive-ui';
import ContentCpt from './content/index.vue';

export default defineComponent({
  components: { NMessageProvider, ContentCpt },
  setup() {},
});
</script>

<style lang="scss" scoped></style>
