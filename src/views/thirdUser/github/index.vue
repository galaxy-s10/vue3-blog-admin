<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :scroll-x="scrollX"
      :loading="tableListLoading"
      :columns="columns"
      :data="tableListData"
      :pagination="pagination"
      :bordered="false"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { DataTableColumns } from 'naive-ui';
import { onMounted, ref } from 'vue';

import { fetchGithubUserList } from '@/api/githubUser';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IGithubUser, IList } from '@/interface';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

interface ISearch extends IGithubUser, IList {}

const tableListData = ref([]);
const total = ref(0);

const tableListLoading = ref(false);
const params = ref<ISearch>({
  nowPage: 1,
  pageSize: 10,
  orderName: 'id',
  orderBy: 'desc',
});
const pagination = usePage();

const createColumns = (): DataTableColumns<IGithubUser> => {
  return [...columnsConfig()];
};

const columns = createColumns();
const scrollX = ref(0);
columns.forEach((item) => {
  if (item.width) {
    scrollX.value += Number(item.width);
  }
});
const ajaxFetchList = async (args) => {
  try {
    tableListLoading.value = true;
    const res: any = await fetchGithubUserList(args);
    if (res.code === 200) {
      tableListLoading.value = false;
      tableListData.value = res.data.rows;
      total.value = res.data.total;

      pagination.page = args.nowPage;
      pagination.itemCount = res.data.total;
      pagination.pageSize = args.pageSize;
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
    rangTimeType: v.rangTimeType ? 'created_at' : undefined,
    rangTimeStart: v.rangTimeType ? v.rangTimeType[0] : undefined,
    rangTimeEnd: v.rangTimeType ? v.rangTimeType[1] : undefined,
  };
  handlePageChange(1);
};
</script>

<style lang="scss" scoped></style>
