<template>
  <n-tree
    block-line
    checkable
    cascade
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    key-field="auth_description"
    label-field="auth_description"
    children-field="children"
    selectable
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { fetchTreeList } from '@/api/auth';

export default defineComponent({
  setup() {
    let data = ref([]);
    onMounted(async () => {
      // const res = await fetchRoleAuth(1);
      const res = await fetchTreeList();
      console.log(res, 4354);
      data.value = res.data;
    });
    return {
      data: data,
      defaultExpandedKeys: ref([]),
    };
  },
});
</script>
