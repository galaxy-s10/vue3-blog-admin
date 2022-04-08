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

import { fetchList } from '@/api/qqUser';
type IProp = {
  id: number;
  client_id: number;
  openid: string;
  unionid: string;
  nickname: string;
  figureurl: string;
  figureurl_1: string;
  figureurl_2: string;
  figureurl_qq_1: string;
  figureurl_qq_2: string;
  constellation: string;
  gender: string;
  city: string;
  province: string;
  year: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
};
const createColumns = (): DataTableColumns<IProp> => {
  return [
    {
      title: 'id',
      key: 'id',
      width: '100',
      align: 'center',
    },
    {
      title: 'client_id',
      key: 'client_id',
      width: '200',
      align: 'center',
    },
    {
      title: 'openid',
      key: 'openid',
      width: '200',
      align: 'center',
    },
    {
      title: 'unionid',
      key: 'unionid',
      width: '200',
      align: 'center',
    },
    {
      title: '昵称',
      key: 'nickname',
      width: '200',
      align: 'center',
    },
    {
      title: 'figureurl',
      key: 'figureurl',
      width: '200',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl,
        });
      },
    },
    {
      title: 'figureurl_1',
      key: 'figureurl_1',
      width: '200',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_1,
        });
      },
    },
    {
      title: 'figureurl_2',
      key: 'figureurl_2',
      width: '200',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_2,
        });
      },
    },
    {
      title: 'figureurl_qq_1',
      key: 'figureurl_qq_1',
      width: '200',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_qq_1,
        });
      },
    },
    {
      title: 'figureurl_qq_2',
      key: 'figureurl_qq_2',
      width: '200',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_qq_2,
        });
      },
    },
    {
      title: '星座',
      key: 'constellation',
      width: '100',
      align: 'center',
    },
    {
      title: 'gender',
      key: '性别',
      width: '100',
      align: 'center',
    },
    {
      title: '市/区',
      key: 'city',
      width: '100',
      align: 'center',
    },
    {
      title: '省',
      key: 'province',
      width: '100',
      align: 'center',
    },
    {
      title: 'year',
      key: 'year',
      width: '100',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'created_at',
      width: '100',
      align: 'center',
    },
    {
      title: '更新时间',
      key: 'updated_at',
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
      pageSize: 7,
      orderBy: 'asc',
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
