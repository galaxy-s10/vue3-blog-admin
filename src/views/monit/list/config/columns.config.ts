import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { MONIT_TYPE_MAP } from '@/constant';
import { IMonit } from '@/interface';

export const columnsConfig = (): DataTableColumns<IMonit> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '类型',
      key: 'type',
      align: 'center',
      width: 100,
      render(row) {
        return h('b', null, MONIT_TYPE_MAP[row.type!]);
      },
    },
    {
      title: 'info',
      key: 'info',
      align: 'center',
      width: 600,
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
