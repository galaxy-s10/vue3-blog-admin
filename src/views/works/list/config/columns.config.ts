import { type DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IWorks } from '@/interface';

export const columnsConfig = (): DataTableColumns<IWorks> => {
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
      title: '简介',
      key: 'desc',
      width: '100',
      align: 'center',
    },
    {
      title: '背景图',
      key: 'bg_url',
      width: '200',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.bg_url,
          width: 100,
        });
      },
    },
    {
      title: '线上地址',
      key: 'url',
      width: '200',
      align: 'center',
    },
    {
      title: '权重',
      key: 'priority',
      width: '100',
      align: 'center',
    },
    {
      title: '状态',
      key: 'status',
      width: '100',
      align: 'center',
      render(row) {
        return row.status === 1 ? '已发布' : '未发布';
      },
    },
  ];
};
