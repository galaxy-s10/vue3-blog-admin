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
      :scroll-x="7000"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

import type { DataTableColumns } from 'naive-ui';

import { fetchGithubUserList } from '@/api/githubUser';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IGithubUser, IList } from '@/interface';
interface ISearch extends IGithubUser, IList {}

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

    const createColumns = (): DataTableColumns<IGithubUser> => {
      return [...columnsConfig()];
    };

    const ajaxFetchList = async (params) => {
      try {
        isLoading.value = true;
        const res: any = await fetchGithubUserList(params);
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
      listData,
      params,
      searchFormConfig,
      handleSearch,
      columns: createColumns(),
      pagination: paginationReactive,
    };
  },
});
</script>

<style lang="scss" scoped></style>
