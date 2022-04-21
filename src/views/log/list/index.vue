<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :scroll-x="2000"
      :loading="logListLoading"
      :columns="columns"
      :data="logListData"
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

import { fetchLogList } from '@/api/log';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { ILog, IList } from '@/interface';

interface ISearch extends ILog, IList {}

export default defineComponent({
  components: { HSearch },
  setup() {
    const logListData = ref([]);
    const total = ref(0);
    let paginationReactive = usePage();

    const logListLoading = ref(false);
    const currRow = ref({});
    const addLogRef = ref<any>(null);
    const params = ref<ISearch>({
      nowPage: 1,
      pageSize: 10,
      orderName: 'id',
      orderBy: 'desc',
    });
    const createColumns = (): DataTableColumns<ILog> => {
      return [...columnsConfig()];
    };

    const ajaxFetchList = async (params) => {
      try {
        logListLoading.value = true;
        const res: any = await fetchLogList(params);
        if (res.code === 200) {
          logListLoading.value = false;
          logListData.value = res.data.rows;
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
      currRow,
      addLogRef,
      logListData,
      logListLoading,
      columns: createColumns(),
      pagination: paginationReactive,
      searchFormConfig,
      params,
    };
  },
});
</script>

<style lang="scss" scoped></style>
