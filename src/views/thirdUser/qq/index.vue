<template>
  <div>
    <n-data-table
      ref="table"
      remote
      :loading="isLoading"
      :columns="columns"
      :data="logData"
      :pagination="pagination"
      :bordered="false"
      :scroll-x="2500"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { NButton } from 'naive-ui';
import { h, defineComponent, onMounted, ref, reactive } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { fetchQqUserList } from '@/api/qqUser';
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
      align: 'center',
    },
    {
      title: 'client_id',
      key: 'client_id',
      align: 'center',
    },
    {
      title: 'openid',
      key: 'openid',
      align: 'center',
    },
    {
      title: 'unionid',
      key: 'unionid',
      align: 'center',
    },
    {
      title: '昵称',
      key: 'nickname',
      align: 'center',
    },
    {
      title: 'figureurl',
      key: 'figureurl',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl,
          width: 100,
        });
      },
    },
    {
      title: 'figureurl_1',
      key: 'figureurl_1',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_1,
          width: 100,
        });
      },
    },
    {
      title: 'figureurl_2',
      key: 'figureurl_2',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_2,
          width: 100,
        });
      },
    },
    {
      title: 'figureurl_qq_1',
      key: 'figureurl_qq_1',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_qq_1,
          width: 100,
        });
      },
    },
    {
      title: 'figureurl_qq_2',
      key: 'figureurl_qq_2',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_qq_2,
          width: 100,
        });
      },
    },
    {
      title: '星座',
      key: 'constellation',
      align: 'center',
    },
    {
      title: 'gender',
      key: '性别',
      align: 'center',
    },
    {
      title: '市/区',
      key: 'city',
      align: 'center',
    },
    {
      title: '省',
      key: 'province',
      align: 'center',
    },
    {
      title: 'year',
      key: 'year',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
    },
    {
      title: '更新时间',
      key: 'updated_at',
      align: 'center',
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
     * ajaxfetchQqUserList
     */
    const ajaxFetchList = async (params) => {
      try {
        isLoading.value = true;
        const res: any = await fetchQqUserList(params);
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
      params.nowPage = currentPage;
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
