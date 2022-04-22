import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IStar } from '@/interface';

export const columnsConfig = (): DataTableColumns<IStar> => {
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
      title: '评论id',
      key: 'comment_id',
      align: 'center',
    },
    {
      title: '点赞的用户',
      key: 'from_user_id',
      align: 'center',
      render(row) {
        return h('div', {}, row.from_user!.username);
      },
    },
    {
      title: '被点赞的用户',
      key: 'to_user_id',
      align: 'center',
      render(row) {
        return h('div', {}, row.to_user?.username || '-');
      },
    },
  ];
};
