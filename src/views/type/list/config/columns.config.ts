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
  ];
};
