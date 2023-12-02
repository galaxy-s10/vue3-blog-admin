import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IMusic } from '@/interface';

export const columnsConfig = (): DataTableColumns<IMusic> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '歌名',
      key: 'name',
      align: 'center',
      width: 100,
    },
    {
      title: '封面图',
      key: 'cover_pic',
      align: 'center',
      width: 120,
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
      width: 100,
    },
    {
      title: '音频资源',
      key: 'audio_url',
      align: 'center',
      width: 300,
      render(row) {
        return h('audio', {
          src: row.audio_url,
          width: 300,
          height: 50,
          controls: true,
        });
      },
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      width: 100,
      render(row) {
        return row.status === 1 ? '已审核' : '未审核';
      },
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
