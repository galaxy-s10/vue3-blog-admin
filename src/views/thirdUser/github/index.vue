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
      :scroll-x="3500"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { h, defineComponent, onMounted, ref, reactive } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { fetchGithubUserList } from '@/api/githubUser';
type ILog = {
  id: number;
  client_id: string;
  login: string;
  github_id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  type: string;
  site_admin: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: any;
  hireable: any;
  bio: string;
  twitter_username: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  github_created_at: string;
  github_updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
};
const createColumns = (): DataTableColumns<ILog> => {
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
      title: 'login',
      key: 'login',
      align: 'center',
    },
    {
      title: 'github_id',
      key: 'github_id',
      align: 'center',
    },
    {
      title: 'node_id',
      key: 'node_id',
      align: 'center',
    },
    {
      title: 'avatar_url',
      key: 'avatar_url',
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
      align: 'center',
    },
    {
      title: 'url',
      key: 'url',
      align: 'center',
    },
    {
      title: 'html_url',
      key: 'html_url',
      align: 'center',
    },
    {
      title: 'type',
      key: 'type',
      align: 'center',
    },
    {
      title: 'site_admin',
      key: 'site_admin',
      align: 'center',
    },
    {
      title: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'company',
      key: 'company',
      align: 'center',
    },
    {
      title: 'blog',
      key: 'blog',
      align: 'center',
    },
    {
      title: 'location',
      key: 'location',
      align: 'center',
    },
    {
      title: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'hireable',
      key: 'hireable',
      align: 'center',
    },
    {
      title: 'bio',
      key: 'bio',
      align: 'center',
    },
    {
      title: 'twitter_username',
      key: 'twitter_username',
      align: 'center',
    },
    {
      title: 'public_repos',
      key: 'public_repos',
      align: 'center',
    },
    {
      title: 'public_gists',
      key: 'public_gists',
      align: 'center',
    },
    {
      title: 'followers',
      key: 'followers',
      align: 'center',
    },
    {
      title: 'following',
      key: 'following',
      align: 'center',
    },
    {
      title: 'github_created_at',
      key: 'github_created_at',
      align: 'center',
    },
    {
      title: 'github_updated_at',
      key: 'github_updated_at',
      align: 'center',
    },
    {
      title: 'private_gists',
      key: 'private_gists',
      align: 'center',
    },
    {
      title: 'total_private_repos',
      key: 'total_private_repos',
      align: 'center',
    },
    {
      title: 'owned_private_repos',
      key: 'owned_private_repos',
      align: 'center',
    },
    {
      title: 'disk_usage',
      key: 'disk_usage',
      align: 'center',
    },
    {
      title: 'collaborators',
      key: 'collaborators',
      align: 'center',
    },
    {
      title: 'two_factor_authentication',
      key: 'two_factor_authentication',
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
     * ajaxfetchGithubUserList
     */
    const ajaxFetchList = async (params) => {
      try {
        isLoading.value = true;
        const res: any = await fetchGithubUserList(params);
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
