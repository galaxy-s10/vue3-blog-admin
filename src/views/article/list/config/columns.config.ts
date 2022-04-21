import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IArticle } from '@/interface';

export const columnsConfig = (): DataTableColumns<IArticle> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '标题',
      key: 'title',
      align: 'center',
    },
    {
      title: '简介',
      key: 'desc',
      align: 'center',
      render(row) {
        return h('div', {}, row.desc || '-');
      },
    },
    {
      title: '是否开启评论',
      key: 'is_comment',
      align: 'center',
      render(row) {
        return row.is_comment === 1 ? '开启' : '关闭';
      },
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row) {
        return row.status === 1 ? '已审核' : '未审核';
      },
    },
    {
      title: '封面图',
      key: 'head_img',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.head_img,
          width: 100,
        });
      },
    },
    {
      title: '点击量',
      key: 'click',
      align: 'center',
    },
    {
      title: '获赞数',
      key: 'star_total',
      align: 'center',
    },
    {
      title: '评论数',
      key: 'comment_total',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
    },
    {
      title: '最后更新',
      key: 'updated_at',
      align: 'center',
    },
  ];
};
