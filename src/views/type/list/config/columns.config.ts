import { ITag } from '@/interface';

import type { DataTableColumns } from 'naive-ui';

export const columnsConfig = (): DataTableColumns<ITag> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '名称',
      key: 'name',
      align: 'center',
      width: 100,
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
      width: 200,
    },
    {
      title: '最后更新',
      key: 'updated_at',
      align: 'center',
      width: 200,
    },
  ];
};
