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
import { NButton, useMessage, DataTableColumns } from 'naive-ui';
import { h, defineComponent, onMounted, ref, reactive } from 'vue';

import { fetchList } from '@/api/qqUser';
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
const createColumns = ({
  play,
}: {
  play: (row: ILog) => void;
}): DataTableColumns<ILog> => {
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
      title: 'Action',
      key: 'actions',
      width: '100',
      align: 'center',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => play(row),
          },
          { default: () => 'Play' }
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
      pageCount: 0, //总页数
      pageSize: 0, //分页大小
      prefix() {
        return `Total is ${total.value}.`;
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
          total.value = res.data.count;
          paginationReactive.page = params.nowPage;
          paginationReactive.pageCount = Math.ceil(
            res.data.count / params.pageSize
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
      columns: createColumns({
        play(row: Song) {
          // message.info(`Play ${row.title}`);
        },
      }),
      pagination: paginationReactive,
    };
  },
});
</script>

<style lang="scss" scoped></style>