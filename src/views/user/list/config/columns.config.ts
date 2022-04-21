import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IUser } from '@/interface';

export const columnsConfig = (): DataTableColumns<IUser> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '用户名',
      key: 'username',
      align: 'center',
    },
    {
      title: '头像',
      key: 'avatar',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.avatar,
          width: 100,
        });
      },
    },
    {
      title: '简介',
      key: 'desc',
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row) {
        return row.status === 1 ? '正常' : '非法';
      },
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
