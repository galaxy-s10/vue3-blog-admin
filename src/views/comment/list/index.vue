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
      :scroll-x="2000"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { NButton } from 'naive-ui';
import { h, defineComponent, onMounted, ref, reactive } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { fetchCommentList } from '@/api/comment';
import { IUser } from '@/interface';

type ILog = {
  id: number;
  article_id: number;
  parent_comment_id: number;
  reply_comment_id: number;
  from_user_id: number;
  to_user_id: number;
  content: string;
  children_comment_total: number;
  star_total: number;
  ua: string;
  ip: string;
  ip_data: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  from_user: IUser;
  to_user: IUser | null;
};
const createColumns = (): DataTableColumns<ILog> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '文章id',
      key: 'article_id',
      align: 'center',
    },
    {
      title: '父评论id',
      key: 'parent_comment_id',
      align: 'center',
    },
    {
      title: '回复id',
      key: 'reply_comment_id',
      align: 'center',
    },
    {
      title: '留言的用户',
      key: 'from_user_id',
      align: 'center',
      render(row) {
        return h('div', {}, row.from_user.username);
      },
    },
    {
      title: '被回复的用户',
      key: 'to_user_id',
      align: 'center',
      render(row) {
        return h('div', {}, row.to_user?.username || '-');
      },
    },
    {
      title: '内容',
      key: 'content',
      align: 'center',
    },
    {
      title: '子评论数',
      key: 'children_comment_total',
      align: 'center',
    },
    {
      title: '获赞数',
      key: 'star_total',
      align: 'center',
    },
    {
      title: 'ua',
      key: 'ua',
      align: 'center',
      width: 200,
    },
    {
      title: 'ip',
      key: 'ip',
      align: 'center',
    },
    {
      title: 'ip_data',
      key: 'ip_data',
      align: 'center',
      width: 200,
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
      pageSize: 10,
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
     * ajaxfetchCommentList
     */
    const ajaxFetchList = async (params) => {
      try {
        isLoading.value = true;
        const res: any = await fetchCommentList(params);
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
