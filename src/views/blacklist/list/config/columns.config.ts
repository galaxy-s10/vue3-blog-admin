import { DataTableColumns } from 'naive-ui';

import { IBlacklist } from '@/interface';

export const columnsConfig = (): DataTableColumns<IBlacklist> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: 'ip',
      key: 'ip',
      align: 'center',
      width: 200,
    },
    {
      title: '用户id',
      key: 'user_id',
      align: 'center',
      width: 200,
    },
    {
      title: 'type',
      key: 'type',
      align: 'center',
      width: 200,
    },
    {
      title: 'user_agent',
      key: 'user_agent',
      align: 'center',
      width: 300,
    },
    {
      title: 'msg',
      key: 'msg',
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
