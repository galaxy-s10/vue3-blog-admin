import dayjs from 'dayjs';
import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

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
      title: '用户id',
      key: 'user_id',
      align: 'center',
      width: 100,
    },
    {
      title: 'prefix',
      key: 'prefix',
      align: 'center',
      width: 200,
    },
    {
      title: 'bucket',
      key: 'bucket',
      align: 'center',
      width: 100,
    },
    {
      title: 'qiniu_key',
      key: 'qiniu_key',
      align: 'center',
      width: 200,
    },
    {
      title: 'qiniu_hash',
      key: 'qiniu_hash',
      align: 'center',
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'qiniu_fsize',
      key: 'qiniu_fsize',
      align: 'center',
      width: 100,
      render(row) {
        return h('span', {}, formatMemorySize(row.qiniu_fsize!));
      },
    },
    {
      title: 'qiniu_mimeType',
      key: 'qiniu_mimeType',
      align: 'center',
      width: 200,
    },
    {
      title: 'qiniu_putTime',
      key: 'qiniu_putTime',
      align: 'center',
      width: 200,
      render(row) {
        const time = `${row.qiniu_putTime}`;
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
      width: 100,
    },
    {
      title: 'qiniu_status',
      key: 'qiniu_status',
      align: 'center',
      width: 100,
    },
    {
      title: 'qiniu_md5',
      key: 'qiniu_md5',
      align: 'center',
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
      width: 200,
    },
    {
      title: '最后更新',
      key: 'updated_at',
      align: 'center',
      width: 200,
    },
  ];
};
