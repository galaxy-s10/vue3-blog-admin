import { h } from 'vue';

import { IStar } from '@/interface';

import type { DataTableColumns } from 'naive-ui';

export const columnsConfig = (): DataTableColumns<IStar> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '文章id',
      key: 'article_id',
      align: 'center',
      width: 100,
    },
    {
      title: '评论id',
      key: 'comment_id',
      align: 'center',
      width: 100,
    },
    {
      title: '点赞的用户',
      key: 'from_user_id',
      align: 'center',
      width: 150,
      render(row) {
        return h('div', {}, row.from_user!.username);
      },
    },
    {
      title: '被点赞的用户',
      key: 'to_user_id',
      align: 'center',
      width: 150,
      render(row) {
        return h('div', {}, row.to_user?.username || '-');
      },
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
      width: 180,
      fixed: 'right',
    },
    {
      title: '最后更新',
      key: 'updated_at',
      align: 'center',
      width: 180,
      fixed: 'right',
    },
  ];
};
