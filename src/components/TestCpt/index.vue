<template>
  <div>
    <slot></slot>
    <slot name="ccc"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, useSlots } from 'vue';
export default defineComponent({
  components: {},
  setup() {
    const slots = useSlots();
    console.log(slots.ccc(), 'useSlots');
  },
});
</script>

<style lang="scss" scoped></style>
