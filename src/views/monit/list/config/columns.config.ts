import { h } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { IMonit } from '@/interface';
export const monitTypeMap = {
  1: '服务器内存日志',
  2: '服务器内存达到阈值',
  3: '监控七牛云',
  4: '监控node进程',
  5: '重启pm2',
  6: '清除buff/cache',
  7: '备份数据库',
};
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
        return h('b', null, monitTypeMap[row.type!]);
      },
    },
    {
      title: 'info',
      key: 'info',
      align: 'center',
      width: 600,
      // ellipsis: true,
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
      width: 200,
      fixed: 'right',
    },
    {
      title: '更新时间',
      key: 'updated_at',
      align: 'center',
      width: 200,
      fixed: 'right',
    },
  ];
};
