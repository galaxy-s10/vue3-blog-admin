import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

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
      title: '名称',
      key: 'name',
      align: 'center',
      width: 100,
    },
    {
      title: '颜色',
      key: 'color',
      align: 'center',
      width: 100,
    },
    {
      title: '预览',
      key: '',
      align: 'center',
      width: 100,
      render(row) {
        return h(
          'span',
          {
            style: {
              display: 'inline-block',
              padding: '5px 10px',
              background: row.color,
              fontSize: '12px',
              color: 'white',
              borderRadius: '10px',
            },
          },
          row.name
        );
      },
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
