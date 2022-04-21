import type { DataTableColumns } from 'naive-ui';

import { ITag } from '@/interface';

export const columnsConfig = (): DataTableColumns<ITag> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '用户id',
      key: 'user_id',
      align: 'center',
    },
    {
      title: 'ip',
      key: 'ip',
      align: 'center',
    },
    {
      title: 'ip信息',
      key: 'ip_data',
      align: 'center',
      width: 400,
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
