import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IMusic } from '@/interface';

export const columnsConfig = (): DataTableColumns<IMusic> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '歌名',
      key: 'name',
      align: 'center',
    },
    {
      title: '封面图',
      key: 'cover_pic',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.cover_pic,
          width: 100,
        });
      },
    },
    {
      title: '作者',
      key: 'author',
      align: 'center',
    },
    {
      title: '音频资源',
      key: 'audio_url',
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row) {
        return row.status === 1 ? '已审核' : '未审核';
      },
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
