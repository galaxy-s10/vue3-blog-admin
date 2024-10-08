import { DataTableColumns } from 'naive-ui';

import { ITag } from '@/interface';

export const columnsConfig = (): DataTableColumns<ITag> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '用户id',
      key: 'user_id',
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
      title: 'ip信息',
      key: 'ip_data',
      align: 'center',
      width: 300,
    },
    {
      title: '页面路径',
      key: 'page_url',
      align: 'center',
      width: 300,
    },
    {
      title: 'user_agent',
      key: 'user_agent',
      align: 'center',
      width: 400,
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
