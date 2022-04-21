import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IWorks } from '@/interface';

export const columnsConfig = (): DataTableColumns<IWorks> => {
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
      title: '简介',
      key: 'desc',
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '背景图',
      key: 'bg_url',
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
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '权重',
      key: 'priority',
      align: 'center',
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row) {
        return row.status === 1 ? '已发布' : '未发布';
      },
    },
  ];
};
