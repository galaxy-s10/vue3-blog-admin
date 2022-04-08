<template>
  <n-tree
    block-line
    checkable
    cascade
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    key-field="role_description"
    label-field="role_description"
    children-field="children"
    selectable
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { fetchTreeList } from '@/api/role';

export default defineComponent({
  setup() {
    let data = ref([]);
    onMounted(async () => {
      const res = await fetchTreeList();
      data.value = res.data;
    });
    return {
      data: data,
      defaultExpandedKeys: ref([]),
    };
  },
});
</script>
