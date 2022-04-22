import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IComment } from '@/interface';

export const columnsConfig = (): DataTableColumns<IComment> => {
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
        return h('div', {}, row.from_user!.username);
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
