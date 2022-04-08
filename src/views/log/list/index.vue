<template>
  <div>
    <!-- <n-spin :show="isLoading"> -->
    <n-data-table
      ref="table"
      remote
      :loading="isLoading"
      :columns="columns"
      :data="logData"
      :pagination="pagination"
      :bordered="false"
      :scroll-x="1500"
      @update:page="handlePageChange"
    />
    <!-- </n-spin> -->
  </div>
</template>

<script lang="ts">
import { NButton } from 'naive-ui';
import { h, defineComponent, onMounted, ref, reactive } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { fetchList } from '@/api/log';
type ILog = {
  id: number;
  user_id: number;
  api_sql_duration: number;
  api_user_agent: string;
  api_from: number;
  api_ip: string;
  api_hostname: string;
  api_method: string;
  api_path: string;
  api_query: string;
  api_body: string;
  api_err_msg: string;
  api_err_stack: string;
};
const createColumns = (): DataTableColumns<ILog> => {
  return [
    {
      title: 'id',
      key: 'id',
      width: '100',
      align: 'center',
    },
    {
      title: 'user_id',
      key: 'user_id',
      width: '100',
      align: 'center',
    },
    {
      title: 'api_sql_duration',
      key: 'api_sql_duration',
      width: '200',
      align: 'center',
    },
    {
      title: 'api_user_agent',
      key: 'api_user_agent',
      width: '200',
      align: 'center',
    },
    {
      title: 'api_from',
      key: 'api_from',
      width: '100',
      align: 'center',
      render(row) {
        return h('b', null, row.api_from === 1 ? '前台' : '后台');
      },
    },
    {
      title: 'api_ip',
      key: 'api_ip',
      width: '100',
      align: 'center',
    },
    {
      title: 'api_hostname',
      key: 'api_hostname',
      width: '200',
      align: 'center',
    },
    {
      title: 'api_method',
      key: 'api_method',
      width: '200',
      align: 'center',
    },
    {
      title: 'api_path',
      key: 'api_path',
      width: '100',
      align: 'center',
    },
    {
      title: 'api_query',
      key: 'api_query',
      width: '100',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'api_body',
      key: 'api_body',
      width: '100',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'api_err_msg',
      key: 'api_err_msg',
      width: '200',
      align: 'center',
    },
    {
      title: 'api_err_stack',
      key: 'api_err_stack',
      width: '200',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'created_at',
      key: 'created_at',
      width: '200',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'actions',
      width: '100',
      align: 'center',
      render() {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
          },
          () => 'Action'
        );
      },
    },
  ];
};

export default defineComponent({
  components: {},
  setup() {
    let logData = ref([]);
    let total = ref(0);

    let isLoading = ref(false);
    const params = reactive({
      nowPage: 1,
      pageSize: 10,
      orderBy: 'desc',
      orderName: 'id',
    });
    const paginationReactive = reactive({
      page: 0, //当前页
      itemCount: 0, //总条数
      pageSize: 0, //分页大小
      prefix() {
        return `一共${total.value}条数据`;
      },
    });

    /**
     * ajaxfetchList
     */
    const ajaxFetchList = async (params) => {
      try {
        isLoading.value = true;
        const res: any = await fetchList(params);
        if (res.code === 200) {
          isLoading.value = false;
          logData.value = res.data.rows;
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
      await ajaxFetchList(params);
    });
    const handlePageChange = async (currentPage) => {
      await ajaxFetchList({ ...params, nowPage: currentPage });
    };
    return {
      handlePageChange,
      isLoading: isLoading,
      logData,
      columns: createColumns(),
      pagination: paginationReactive,
    };
  },
});
</script>

<style lang="scss" scoped></style>
