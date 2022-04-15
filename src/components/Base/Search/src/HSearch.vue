<template>
  <div class="search-wrap">
    <HForm ref="formRef" v-bind="searchFormConfig" v-model="formData"></HForm>
    <n-space justify="end">
      <n-button type="info" @click="handleReset">重置</n-button>
      <n-button type="success" @click="handleSearch">搜索</n-button>
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import HForm from '@/components/Base/Form';

export default defineComponent({
  components: { HForm },
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true,
      default: () => {},
    },
  },
  emits: ['clickReset', 'clickSearch'],
  setup(props, { emit }) {
    const formData = ref({});
    const formRef = ref<any>(null);

    const handleReset = () => {
      for (const item in formData.value) {
        formData.value[`${item}`] = null;
      }
      emit('clickReset');
    };

    const handleSearch = async () => {
      try {
        const res = await formRef.value.handleValidate();
        emit('clickSearch', res);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      formData,
      formRef,
      handleReset,
      handleSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-wrap {
  margin-bottom: 10px;
}
</style>
