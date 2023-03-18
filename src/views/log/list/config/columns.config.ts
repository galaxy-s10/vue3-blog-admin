import { h } from 'vue';

import { ILog } from '@/interface';

import type { DataTableColumns } from 'naive-ui';

export const columnsConfig = (): DataTableColumns<ILog> => {
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
      title: 'api_duration',
      key: 'api_duration',
      align: 'center',
      width: 150,
    },
    {
      title: 'api_from',
      key: 'api_from',
      align: 'center',
      width: 100,
      render(row) {
        return h('b', null, row.api_from === 1 ? '前台' : '后台');
      },
    },
    {
      title: 'api_referer',
      key: 'api_referer',
      align: 'center',
      width: 200,
    },
    {
      title: 'api_real_ip',
      key: 'api_real_ip',
      align: 'center',
      width: 150,
    },
    {
      title: 'api_forwarded_for',
      key: 'api_forwarded_for',
      align: 'center',
      width: 150,
    },
    {
      title: 'api_host',
      key: 'api_host',
      align: 'center',
      width: 150,
    },
    {
      title: 'api_hostname',
      key: 'api_hostname',
      align: 'center',
      width: 150,
    },
    {
      title: 'api_method',
      key: 'api_method',
      align: 'center',
      width: 150,
    },

    {
      title: 'api_path',
      key: 'api_path',
      align: 'center',
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'api_query',
      key: 'api_query',
      align: 'center',
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'api_body',
      key: 'api_body',
      align: 'center',
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'api_user_agent',
      key: 'api_user_agent',
      align: 'center',
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'api_status_code',
      key: 'api_status_code',
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'api_err_code',
      key: 'api_err_code',
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'api_error',
      key: 'api_error',
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'api_err_msg',
      key: 'api_err_msg',
      align: 'center',
      width: 150,
      fixed: 'right',
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
