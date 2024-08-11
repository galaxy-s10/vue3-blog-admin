import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IGithubUser } from '@/interface';

export const columnsConfig = (): DataTableColumns<IGithubUser> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: 'client_id',
      key: 'client_id',
      align: 'center',
      width: 200,
    },
    {
      title: 'login',
      key: 'login',
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'github_id',
      key: 'github_id',
      align: 'center',
      width: 200,
    },
    {
      title: 'node_id',
      key: 'node_id',
      align: 'center',
      width: 200,
    },
    {
      title: 'avatar_url',
      key: 'avatar_url',
      align: 'center',
      width: 100,
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
      width: 200,
    },
    {
      title: 'url',
      key: 'url',
      align: 'center',
      width: 200,
    },
    {
      title: 'html_url',
      key: 'html_url',
      align: 'center',
      width: 200,
    },
    {
      title: 'type',
      key: 'type',
      align: 'center',
      width: 100,
    },
    {
      title: 'site_admin',
      key: 'site_admin',
      align: 'center',
      width: 100,
    },
    {
      title: 'name',
      key: 'name',
      align: 'center',
      width: 200,
    },
    {
      title: 'company',
      key: 'company',
      align: 'center',
      width: 200,
    },
    {
      title: 'blog',
      key: 'blog',
      align: 'center',
      width: 200,
    },
    {
      title: 'location',
      key: 'location',
      align: 'center',
      width: 200,
    },
    {
      title: 'email',
      key: 'email',
      align: 'center',
      width: 200,
    },
    {
      title: 'hireable',
      key: 'hireable',
      align: 'center',
      width: 200,
    },
    {
      title: 'bio',
      key: 'bio',
      align: 'center',
      width: 200,
    },
    {
      title: 'twitter_username',
      key: 'twitter_username',
      align: 'center',
      width: 200,
    },
    {
      title: 'public_repos',
      key: 'public_repos',
      align: 'center',
      width: 200,
    },
    {
      title: 'public_gists',
      key: 'public_gists',
      align: 'center',
      width: 200,
    },
    {
      title: 'followers',
      key: 'followers',
      align: 'center',
      width: 200,
    },
    {
      title: 'following',
      key: 'following',
      align: 'center',
      width: 200,
    },
    {
      title: 'github_created_at',
      key: 'github_created_at',
      align: 'center',
      width: 200,
    },
    {
      title: 'github_updated_at',
      key: 'github_updated_at',
      align: 'center',
      width: 200,
    },
    {
      title: 'private_gists',
      key: 'private_gists',
      align: 'center',
      width: 200,
    },
    {
      title: 'total_private_repos',
      key: 'total_private_repos',
      align: 'center',
      width: 200,
    },
    {
      title: 'owned_private_repos',
      key: 'owned_private_repos',
      align: 'center',
      width: 200,
    },
    {
      title: 'disk_usage',
      key: 'disk_usage',
      align: 'center',
      width: 200,
    },
    {
      title: 'collaborators',
      key: 'collaborators',
      align: 'center',
      width: 200,
    },
    {
      title: 'two_factor_authentication',
      key: 'two_factor_authentication',
      align: 'center',
      width: 200,
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
      width: 200,
      fixed: 'right',
    },
    {
      title: '最后更新',
      key: 'updated_at',
      align: 'center',
      width: 200,
      fixed: 'right',
    },
  ];
};
