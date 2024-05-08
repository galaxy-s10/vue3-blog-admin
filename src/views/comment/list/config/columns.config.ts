import { DataTableColumns } from 'naive-ui';
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
      title: '状态',
      key: 'status',
      align: 'center',
      render(row) {
        return row.status === 1 ? '显示' : '隐藏';
      },
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
        return h('div', {}, row.to_user?.username || '暂无');
      },
    },
    {
      title: '内容',
      key: 'content',
      align: 'center',
      width: 300,
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
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'ip',
      key: 'ip',
      align: 'center',
      width: 200,
    },
    {
      title: 'ip_data',
      key: 'ip_data',
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true,
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
