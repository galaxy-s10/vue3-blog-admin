import { DataTableColumns } from 'naive-ui';

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
      title: '模块',
      key: 'model',
      align: 'center',
      width: 100,
    },
    {
      title: '语言',
      key: 'lang',
      align: 'center',
      width: 100,
    },
    {
      title: 'key',
      key: 'key',
      align: 'center',
      width: 100,
    },
    {
      title: 'value',
      key: 'value',
      align: 'center',
      width: 100,
    },
    {
      title: '简介',
      key: 'desc',
      align: 'center',
      width: 100,
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
      width: 180,
      fixed: 'right',
    },
    {
      title: '最后更新',
      key: 'updated_at',
      align: 'center',
      width: 180,
      fixed: 'right',
    },
  ];
};
