import { h } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { IQqUser } from '@/interface';

export const columnsConfig = (): DataTableColumns<IQqUser> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'client_id',
      key: 'client_id',
      align: 'center',
    },
    {
      title: 'openid',
      key: 'openid',
      align: 'center',
    },
    {
      title: 'unionid',
      key: 'unionid',
      align: 'center',
    },
    {
      title: '昵称',
      key: 'nickname',
      align: 'center',
    },
    {
      title: 'figureurl',
      key: 'figureurl',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl,
          width: 100,
        });
      },
    },
    {
      title: 'figureurl_1',
      key: 'figureurl_1',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_1,
          width: 100,
        });
      },
    },
    {
      title: 'figureurl_2',
      key: 'figureurl_2',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_2,
          width: 100,
        });
      },
    },
    {
      title: 'figureurl_qq_1',
      key: 'figureurl_qq_1',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_qq_1,
          width: 100,
        });
      },
    },
    {
      title: 'figureurl_qq_2',
      key: 'figureurl_qq_2',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.figureurl_qq_2,
          width: 100,
        });
      },
    },
    {
      title: '星座',
      key: 'constellation',
      align: 'center',
    },
    {
      title: 'gender',
      key: '性别',
      align: 'center',
    },
    {
      title: '市/区',
      key: 'city',
      align: 'center',
    },
    {
      title: '省',
      key: 'province',
      align: 'center',
    },
    {
      title: 'year',
      key: 'year',
      align: 'center',
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
