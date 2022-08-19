import { h } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { ILink } from '@/interface';

export const columnsConfig = (): DataTableColumns<ILink> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: 'qiniu_bucket',
      key: 'qiniu_bucket',
      align: 'center',
      width: 150,
    },
    {
      title: 'qiniu_key',
      key: 'qiniu_key',
      align: 'center',
      width: 150,
    },
    {
      title: 'qiniu_hash',
      key: 'qiniu_hash',
      align: 'center',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'qiniu_fsize',
      key: 'qiniu_fsize',
      align: 'center',
    },
    {
      title: 'qiniu_mimeType',
      key: 'qiniu_mimeType',
      align: 'center',
    },
    {
      title: 'qiniu_putTime',
      key: 'qiniu_putTime',
      align: 'center',
    },
    {
      title: 'qiniu_type',
      key: 'qiniu_type',
      align: 'center',
    },
    {
      title: 'qiniu_status',
      key: 'qiniu_status',
      align: 'center',
    },
    {
      title: 'qiniu_md5',
      key: 'qiniu_md5',
      align: 'center',
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
