import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { ILink } from '@/interface';

export const columnsConfig = (): DataTableColumns<ILink> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '模块',
      key: 'model',
      align: 'center',
    },
    {
      title: '语言',
      key: 'lang',
      align: 'center',
    },
    {
      title: 'key',
      key: 'key',
      align: 'center',
    },
    {
      title: 'value',
      key: 'value',
      align: 'center',
    },
    {
      title: '简介',
      key: 'desc',
      align: 'center',
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
