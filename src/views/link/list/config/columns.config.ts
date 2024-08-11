import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { ILink } from '@/interface';

export const columnsConfig = (): DataTableColumns<ILink> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '邮箱',
      key: 'email',
      align: 'center',
      width: 200,
      render(row) {
        return h('div', {}, row.email || '暂无');
      },
    },
    {
      title: '名称',
      key: 'name',
      align: 'center',
      width: 150,
    },
    {
      title: '头像',
      key: 'avatar',
      align: 'center',
      width: 120,
      render(row) {
        return h('img', {
          src: row.avatar,
          width: 100,
        });
      },
    },
    {
      title: '权重',
      key: 'priority',
      align: 'center',
      width: 100,
    },
    {
      title: '简介',
      key: 'desc',
      align: 'center',
      width: 100,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '链接',
      key: 'url',
      align: 'center',
      width: 200,
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
