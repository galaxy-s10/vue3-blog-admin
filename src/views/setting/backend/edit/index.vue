<template>
  <div>
    <div v-if="!route.query.id">请选择后台设置id</div>
    <AddBackend
      v-if="Object.keys(formData).length"
      v-model="formData"
    ></AddBackend>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { fetchFindBackend } from '@/api/backend';

import AddBackend from '../add/index.vue';

export default defineComponent({
  components: { AddBackend },
  props: {},
  setup() {
    const formData = ref({});
    const route = useRoute();

    onMounted(async () => {
      if (!route.query.id) return;
      const { data } = await fetchFindBackend(+route.query.id!);
      formData.value = data;
    });

    return { route, formData };
  },
});
</script>

<style lang="scss" scoped></style>
