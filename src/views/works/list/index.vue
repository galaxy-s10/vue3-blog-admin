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

import { fetchList } from '@/api/works';

type ILog = {
  id: number;
  name: string;
  desc: string;
  bg_url: string;
  url: string;
  priority: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
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
      title: '名称',
      key: 'name',
      width: '100',
      align: 'center',
    },
    {
      title: '简介',
      key: 'desc',
      width: '100',
      align: 'center',
    },
    {
      title: '背景图',
      key: 'bg_url',
      width: '200',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.bg_url,
          width: 100,
        });
      },
    },
    {
      title: '线上地址',
      key: 'url',
      width: '200',
      align: 'center',
    },
    {
      title: '权重',
      key: 'priority',
      width: '100',
      align: 'center',
    },
    {
      title: '状态',
      key: 'status',
      width: '100',
      align: 'center',
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
          'Action'
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
      orderBy: 'asc',
      orderName: 'id',
    });
    const paginationReactive = reactive({
      page: 0, //当前页
      pageCount: 0, //总页数
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
          paginationReactive.pageCount = Math.ceil(
            res.data.total / params.pageSize
          );
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
