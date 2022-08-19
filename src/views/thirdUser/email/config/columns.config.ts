import { h } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { IEmailUser } from '@/interface';

export const columnsConfig = (): DataTableColumns<IEmailUser> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '邮箱',
      key: 'email',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
      width: 200,
      fixed: 'right',
    },
    {
      title: '更新时间',
      key: 'updated_at',
      align: 'center',
      width: 200,
      fixed: 'right',
    },
  ];
};
