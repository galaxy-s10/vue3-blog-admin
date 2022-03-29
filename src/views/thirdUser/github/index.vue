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

import { fetchList } from '@/api/githubUser';
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
      width: '100',
      align: 'center',
    },
    {
      title: 'login',
      key: 'login',
      width: '100',
      align: 'center',
    },
    {
      title: 'github_id',
      key: 'github_id',
      width: '100',
      align: 'center',
    },
    {
      title: 'node_id',
      key: 'node_id',
      width: '100',
      align: 'center',
    },
    {
      title: 'avatar_url',
      key: 'avatar_url',
      width: '100',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.avatar_url,
          width: 100,
        });
      },
    },
    {
      title: 'gravatar_id',
      key: 'gravatar_id',
      width: '100',
      align: 'center',
    },
    {
      title: 'url',
      key: 'url',
      width: '100',
      align: 'center',
    },
    {
      title: 'html_url',
      key: 'html_url',
      width: '100',
      align: 'center',
    },
    {
      title: 'type',
      key: 'type',
      width: '200',
      align: 'center',
    },
    {
      title: 'site_admin',
      key: 'site_admin',
      width: '100',
      align: 'center',
    },
    {
      title: 'name',
      key: 'name',
      width: '100',
      align: 'center',
    },
    {
      title: 'company',
      key: 'company',
      width: '100',
      align: 'center',
    },
    {
      title: 'blog',
      key: 'blog',
      width: '100',
      align: 'center',
    },
    {
      title: 'location',
      key: 'location',
      width: '100',
      align: 'center',
    },
    {
      title: 'email',
      key: 'email',
      width: '100',
      align: 'center',
    },
    {
      title: 'hireable',
      key: 'hireable',
      width: '100',
      align: 'center',
    },
    {
      title: 'bio',
      key: 'bio',
      width: '100',
      align: 'center',
    },
    {
      title: 'twitter_username',
      key: 'twitter_username',
      width: '200',
      align: 'center',
    },
    {
      title: 'public_repos',
      key: 'public_repos',
      width: '200',
      align: 'center',
    },
    {
      title: 'public_gists',
      key: 'public_gists',
      width: '200',
      align: 'center',
    },
    {
      title: 'followers',
      key: 'followers',
      width: '100',
      align: 'center',
    },
    {
      title: 'following',
      key: 'following',
      width: '100',
      align: 'center',
    },
    {
      title: 'github_created_at',
      key: 'github_created_at',
      width: '200',
      align: 'center',
    },
    {
      title: 'github_updated_at',
      key: 'github_updated_at',
      width: '200',
      align: 'center',
    },
    {
      title: 'private_gists',
      key: 'private_gists',
      width: '200',
      align: 'center',
    },
    {
      title: 'total_private_repos',
      key: 'total_private_repos',
      width: '200',
      align: 'center',
    },
    {
      title: 'owned_private_repos',
      key: 'owned_private_repos',
      width: '200',
      align: 'center',
    },
    {
      title: 'disk_usage',
      key: 'disk_usage',
      width: '100',
      align: 'center',
    },
    {
      title: 'collaborators',
      key: 'collaborators',
      width: '200',
      align: 'center',
    },
    {
      title: 'two_factor_authentication',
      key: 'two_factor_authentication',
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
