<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMessage } from 'naive-ui';

export default defineComponent({
  components: {},
  setup() {
    // @ts-ignore
    window.$message = useMessage();
  },
});
</script>

<style lang="scss" scoped></style>
