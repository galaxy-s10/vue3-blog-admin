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

import { fetchList } from '@/api/article';
import { IMG_CDN_URL } from '@/constant';
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
      title: '标题',
      key: 'title',
      width: '100',
      align: 'center',
    },
    {
      title: '简介',
      key: 'desc',
      width: '200',
      align: 'center',
      render(row) {
        return h('div', {}, row.desc || '-');
      },
    },
    {
      title: '是否开启评论',
      key: 'is_comment',
      width: '120',
      align: 'center',
      render(row) {
        return h('b', null, row.is_comment === 1 ? '开启' : '关闭');
      },
    },
    {
      title: '状态',
      key: 'status',
      width: '100',
      align: 'center',
      render(row) {
        return h('b', null, row.status === 1 ? '审核通过' : '未审核');
      },
    },
    {
      title: '封面图',
      key: 'head_img',
      width: '200',
      align: 'center',
      render(row) {
        return h('img', {
          src: IMG_CDN_URL + row.head_img,
          width: 100,
        });
      },
    },
    {
      title: '点击量',
      key: 'click',
      width: '200',
      align: 'center',
    },
    {
      title: '获赞数',
      key: 'star_total',
      width: '200',
      align: 'center',
    },
    {
      title: '评论数',
      key: 'comment_total',
      width: '200',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'created_at',
      width: '200',
      align: 'center',
    },
    {
      title: '最后更新',
      key: 'updated_at',
      width: '200',
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
      pageSize: 10,
      orderBy: 'desc',
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
