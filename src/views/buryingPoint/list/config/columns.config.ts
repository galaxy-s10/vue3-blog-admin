import { DataTableColumns } from 'naive-ui';

import { IBuryingPoint } from '@/interface';

export const columnsConfig = (): DataTableColumns<IBuryingPoint> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 150,
    },
    {
      title: 'ip',
      key: 'ip',
      align: 'center',
      width: 150,
    },
    {
      title: '文章id',
      key: 'article_id',
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
      title: '扩展字段a',
      key: 'field_a',
      align: 'center',
      width: 200,
    },
    {
      title: '扩展字段b',
      key: 'field_b',
      align: 'center',
      width: 200,
    },
    {
      title: '扩展字段c',
      key: 'field_c',
      align: 'center',
      width: 200,
    },
    {
      title: '扩展字段d',
      key: 'field_d',
      align: 'center',
      width: 200,
    },
    {
      title: '扩展字段e',
      key: 'field_e',
      align: 'center',
      width: 200,
    },
    {
      title: '扩展字段f',
      key: 'field_f',
      align: 'center',
      width: 200,
    },
    {
      title: '扩展字段g',
      key: 'field_g',
      align: 'center',
      width: 200,
    },
    {
      title: 'user_agent',
      key: 'user_agent',
      align: 'center',
      width: 400,
    },
    {
      title: '备注',
      key: 'remark',
      align: 'center',
      width: 200,
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
