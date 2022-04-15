import { type DataTableColumns } from 'naive-ui';

import { ITag } from '@/interface';

export const columnsConfig = (): DataTableColumns<ITag> => {
  return [
    {
      title: 'id',
      key: 'id',
      width: '100',
      align: 'center',
    },
    {
      title: '名称',
      key: 'name',
      width: '100',
      align: 'center',
    },
    {
      title: '颜色',
      key: 'color',
      width: '100',
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
