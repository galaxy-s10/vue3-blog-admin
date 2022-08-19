<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      ref="table"
      remote
      :loading="isLoading"
      :columns="columns"
      :data="listData"
      :pagination="pagination"
      :bordered="false"
      :scroll-x="2500"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

import type { DataTableColumns } from 'naive-ui';

import { fetchQqUserList } from '@/api/qqUser';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IList, IQqUser } from '@/interface';
interface ISearch extends IQqUser, IList {}

export default defineComponent({
  components: { HSearch },
  setup() {
    let listData = ref([]);
    let total = ref(0);
    let isLoading = ref(false);
    const params = ref<ISearch>({
      nowPage: 1,
      pageSize: 10,
      orderName: 'id',
      orderBy: 'desc',
    });
    let paginationReactive = usePage();

    const createColumns = (): DataTableColumns<IQqUser> => {
      return [...columnsConfig()];
    };

    const ajaxFetchList = async (params) => {
      try {
        isLoading.value = true;
        const res: any = await fetchQqUserList(params);
        if (res.code === 200) {
          isLoading.value = false;
          listData.value = res.data.rows;
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
      params.value = {
        ...params.value,
        ...v,
        nowPage: 1,
        pageSize: params.value.pageSize,
      };
      handlePageChange(1);
    };
    return {
      handlePageChange,
      isLoading: isLoading,
      searchFormConfig,
      handleSearch,
      listData,
      params,
      columns: createColumns(),
      pagination: paginationReactive,
    };
  },
});
</script>

<style lang="scss" scoped></style>
