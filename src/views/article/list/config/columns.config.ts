import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IArticle } from '@/interface';

export const columnsConfig = (): DataTableColumns<IArticle> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '权重',
      key: 'priority',
      align: 'center',
      width: 100,
      render(row) {
        return h('div', {}, row.priority || '暂无');
      },
    },
    {
      title: '标题',
      key: 'title',
      align: 'center',
      width: 150,
    },
    {
      title: '简介',
      key: 'desc',
      align: 'center',
      width: 100,
      render(row) {
        return h('div', {}, row.desc || '暂无');
      },
    },
    {
      title: '封面图',
      key: 'head_img',
      align: 'center',
      width: 140,
      render(row) {
        if (row.head_img) {
          return h('img', {
            src: row.head_img,
            width: 120,
          });
        }
        return h('span', {}, '暂无');
      },
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      width: 100,
      render(row) {
        return row.status === 1 ? '已审核' : '未审核';
      },
    },
    {
      title: '点击量',
      key: 'click',
      align: 'center',
      width: 100,
    },
    {
      title: '访问量',
      key: 'visit',
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
      title: '评论数',
      key: 'comment_total',
      align: 'center',
      width: 100,
    },
    {
      title: '评论开关',
      key: 'is_comment',
      align: 'center',
      width: 100,
      render(row) {
        return row.is_comment === 1 ? '开启' : '关闭';
      },
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
