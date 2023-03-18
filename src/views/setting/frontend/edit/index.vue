<template>
  <div>
    <div v-if="!route.query.id">请选择前端设置id</div>
    <AddFrontend
      v-if="Object.keys(formData).length"
      v-model="formData"
    ></AddFrontend>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { fetchFindFrontend } from '@/api/frontend';

import AddFrontend from '../add/index.vue';

export default defineComponent({
  components: { AddFrontend },
  props: {},
  setup() {
    const formData = ref({});
    const route = useRoute();

    onMounted(async () => {
      if (!route.query.id) return;
      const { data } = await fetchFindFrontend(+route.query.id!);
      formData.value = data;
    });

    return { route, formData };
  },
});
</script>

<style lang="scss" scoped></style>
