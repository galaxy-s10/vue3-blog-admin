import dayjs from 'dayjs';
import { h } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { QINIU_CDN_URL } from '@/constant';
import { IQiniuData } from '@/interface';
import { formatMemorySize } from '@/utils';

export const columnsConfig = (): DataTableColumns<IQiniuData> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: 'user_id',
      key: 'user_id',
      align: 'center',
      width: 100,
    },
    {
      title: 'prefix',
      key: 'prefix',
      align: 'center',
      width: 100,
    },
    {
      title: 'bucket',
      key: 'bucket',
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
      title: '预览',
      key: 'preview',
      align: 'center',
      render(row) {
        return h('img', {
          src: QINIU_CDN_URL + row.qiniu_key,
          width: 100,
        });
      },
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
      render(row) {
        return h('span', {}, formatMemorySize(row.qiniu_fsize!));
      },
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
      render(row) {
        const time = row.qiniu_putTime + '';
        return h(
          'span',
          {},
          dayjs(+time.slice(0, time.length - 4)).format('YYYY-MM-DD HH:mm:ss')
        );
      },
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
