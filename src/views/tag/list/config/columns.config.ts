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
      title: '名称',
      key: 'name',
      align: 'center',
    },
    {
      title: '颜色',
      key: 'color',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
    },
    {
      title: '最后更新',
      key: 'updated_at',
      align: 'center',
    },
  ];
};
