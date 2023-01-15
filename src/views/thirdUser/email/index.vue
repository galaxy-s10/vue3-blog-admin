<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :scroll-x="1500"
      :loading="tableListLoading"
      :columns="columns"
      :data="tableListData"
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

import { fetchEmailUserList } from '@/api/emailUser';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IEmailUser, IList } from '@/interface';

interface ISearch extends IEmailUser, IList {}

export default defineComponent({
  components: { HSearch },
  setup() {
    const tableListData = ref([]);
    const total = ref(0);

    const tableListLoading = ref(false);
    const params = ref<ISearch>({
      nowPage: 1,
      pageSize: 10,
      orderName: 'id',
      orderBy: 'desc',
    });

    const ajaxFetchList = async (args) => {
      try {
        tableListLoading.value = true;
        const res: any = await fetchEmailUserList(args);
        if (res.code === 200) {
          tableListLoading.value = false;
          tableListData.value = res.data.rows;
          total.value = res.data.total;

          paginationReactive.page = args.nowPage;
          paginationReactive.itemCount = res.data.total;
          paginationReactive.pageSize = args.pageSize;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };
    const paginationReactive = usePage();

    const createColumns = (): DataTableColumns<IEmailUser> => {
      return [...columnsConfig()];
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
        rangTimeType: 'created_at',
        rangTimeStart: v.rangTimeType[0],
        rangTimeEnd: v.rangTimeType[1],
      };
      handlePageChange(1);
    };
    return {
      handlePageChange,
      tableListLoading,
      tableListData,
      columns: createColumns(),
      params,
      searchFormConfig,
      handleSearch,
      pagination: paginationReactive,
    };
  },
});
</script>

<style lang="scss" scoped></style>
