import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { ILog } from '@/interface';

export const columnsConfig = (): DataTableColumns<ILog> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'user_id',
      key: 'user_id',
      align: 'center',
    },
    {
      title: 'api_sql_duration',
      key: 'api_sql_duration',
      align: 'center',
    },
    {
      title: 'api_user_agent',
      key: 'api_user_agent',
      align: 'center',
      width: 200,
    },
    {
      title: 'api_from',
      key: 'api_from',
      align: 'center',
      render(row) {
        return h('b', null, row.api_from === 1 ? '前台' : '后台');
      },
    },
    {
      title: 'api_ip',
      key: 'api_ip',
      align: 'center',
    },
    {
      title: 'api_hostname',
      key: 'api_hostname',
      align: 'center',
    },
    {
      title: 'api_method',
      key: 'api_method',
      align: 'center',
    },
    {
      title: 'api_path',
      key: 'api_path',
      align: 'center',
    },
    {
      title: 'api_query',
      key: 'api_query',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'api_body',
      key: 'api_body',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'api_err_msg',
      key: 'api_err_msg',
      align: 'center',
    },
    {
      title: 'api_err_stack',
      key: 'api_err_stack',
      align: 'center',
      ellipsis: true,
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
