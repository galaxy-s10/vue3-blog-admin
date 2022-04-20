<template>
  <div>
    <div v-if="!route.query.id">请选择文章</div>
    <AddArticle
      v-if="Object.keys(formData).length"
      v-model="formData"
    ></AddArticle>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AddArticle from '../add';
import { formConfig } from './config/form.config';

import { fetchArticleDetail } from '@/api/article';
export default defineComponent({
  components: { AddArticle },
  props: {},
  setup() {
    const formData = ref({});
    const route = useRoute();
    console.log(route.query, 33);

    onMounted(async () => {
      if (!route.query.id) return;
      const { data } = await fetchArticleDetail(+route.query.id!);
      data.tags = data.tags.map((item) => item.id);
      data.types = data.types.map((item) => item.id);
      formData.value = data;
    });

    return { route, formConfig, formData };
  },
});
</script>

<style lang="scss" scoped></style>
