<template>
  <div v-if="!route.query.id">请选择文章</div>
  <AddArticle
    v-if="Object.keys(formData).length"
    v-model="formData"
  ></AddArticle>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { fetchArticleDetail } from '@/api/article';

import AddArticle from '../add';

const formData = ref({});
const route = useRoute();

onMounted(async () => {
  if (!route.query.id) return;
  const { data } = await fetchArticleDetail(+route.query.id!);
  data.tags = data.tags!.map((item) => item.id);
  data.types = data.types!.map((item) => item.id);
  formData.value = data;
});
</script>

<style lang="scss" scoped></style>
