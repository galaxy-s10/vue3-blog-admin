<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {},
  props: {
    initValue: {
      type: Object,
      default() {
        return {}; // It cannot be written as an ordinary function, or it will report a type error.
      },
    },
  },
  setup(props) {
    /**
     * TS2339: Property 'initValue' does not exist on type 'Readonly<LooseRequired<Readonly<ExtractPropTypes<Readonly<ComponentPropsOptions<Data>>>> &
     * { [x: string & `on${string}`]: ((...args: any[]) => any) | ((...args: unknown[]) => any) | undefined; }>>'.
     */
    const formData = ref({ ...props.initValue });
    console.log(formData);
    return {};
  },
});
</script>
