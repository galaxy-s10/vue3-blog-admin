<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :scroll-x="1200"
      :loading="visitorListLoading"
      :columns="columns"
      :data="visitorListData"
      :pagination="pagination"
      :bordered="false"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

import type { DataTableColumns } from 'naive-ui';

import { fetchVisitorList } from '@/api/visitor';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IVisitor, IList } from '@/interface';

interface ISearch extends IVisitor, IList {}

export default defineComponent({
  components: { HSearch },
  setup() {
    const visitorListData = ref([]);
    const total = ref(0);
    let paginationReactive = usePage();

    const visitorListLoading = ref(false);
    const addVisitorRef = ref<any>(null);
    const params = ref<ISearch>({
      nowPage: 1,
      pageSize: 10,
      orderName: 'id',
      orderBy: 'desc',
    });
    const createColumns = (): DataTableColumns<IVisitor> => {
      return [...columnsConfig()];
    };

    const ajaxFetchList = async (params) => {
      try {
        visitorListLoading.value = true;
        const res: any = await fetchVisitorList(params);
        if (res.code === 200) {
          visitorListLoading.value = false;
          visitorListData.value = res.data.rows;
          total.value = res.data.total;
          paginationReactive.page = params.nowPage;
          paginationReactive.itemCount = res.data.total;
          paginationReactive.pageSize = params.pageSize;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };

    onMounted(async () => {
      await ajaxFetchList(params.value);
    });

    const handlePageChange = async (currentPage) => {
      params.value.nowPage = currentPage;
      await ajaxFetchList({ ...params.value, nowPage: currentPage });
    };

    const handleSearch = (v) => {
      params.value = { ...params.value, ...v };
      handlePageChange(1);
    };

    return {
      handlePageChange,
      handleSearch,
      addVisitorRef,
      visitorListData,
      visitorListLoading,
      columns: createColumns(),
      pagination: paginationReactive,
      searchFormConfig,
      params,
    };
  },
});
</script>

<style lang="scss" scoped></style>
