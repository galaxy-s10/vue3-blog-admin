import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IComment } from '@/interface';

export const columnsConfig = (): DataTableColumns<IComment> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 150,
    },
    {
      title: '文章id',
      key: 'article_id',
      align: 'center',
      width: 150,
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row) {
        return row.status === 1 ? '显示' : '隐藏';
      },
      width: 150,
    },
    {
      title: '父评论id',
      key: 'parent_comment_id',
      align: 'center',
      width: 150,
    },
    {
      title: '回复id',
      key: 'reply_comment_id',
      align: 'center',
      width: 150,
    },
    {
      title: '留言用户',
      key: 'from_user_id',
      align: 'center',
      render(row) {
        return h('div', {}, row.from_user!.username);
      },
      width: 200,
    },
    {
      title: '被留言用户',
      key: 'to_user_id',
      align: 'center',
      render(row) {
        return h('div', {}, row.to_user?.username || '暂无');
      },
      width: 200,
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
      width: 100,
    },
    {
      title: '获赞数',
      key: 'star_total',
      align: 'center',
      width: 100,
    },
    {
      title: 'user_agent',
      key: 'user_agent',
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
      title: 'ip信息',
      key: 'ip_data',
      align: 'center',
      width: 300,
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
