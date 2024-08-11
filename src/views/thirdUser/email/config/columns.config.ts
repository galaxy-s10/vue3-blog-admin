import { DataTableColumns } from 'naive-ui';

import { IEmailUser } from '@/interface';

export const columnsConfig = (): DataTableColumns<IEmailUser> => {
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
