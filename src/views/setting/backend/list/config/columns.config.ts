import { DataTableColumns, NSwitch } from 'naive-ui';
import { h } from 'vue';

import { IBackend } from '@/interface';

export const columnsConfig = (): DataTableColumns<IBackend> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: 'type',
      key: 'type',
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
      ellipsis: true,
      render(row) {
        if (row.type === 'switch') {
          return h(NSwitch, {
            checkedValue: '1',
            uncheckedValue: '2',
            value: row.value,
          });
        } else {
          return row.value;
        }
      },
    },
    {
      title: 'desc',
      key: 'desc',
      align: 'center',
      width: 200,
    },
  ];
};
