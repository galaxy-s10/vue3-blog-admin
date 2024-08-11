import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IQqUser } from '@/interface';

export const columnsConfig = (): DataTableColumns<IQqUser> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: 'client_id',
      key: 'client_id',
      align: 'center',
      width: 150,
    },
    {
      title: 'openid',
      key: 'openid',
      align: 'center',
      width: 150,
    },
    {
      title: 'unionid',
      key: 'unionid',
      align: 'center',
      width: 150,
    },
    {
      title: '昵称',
      key: 'nickname',
      align: 'center',
      width: 150,
    },
    {
      title: 'figureurl',
      key: 'figureurl',
      align: 'center',
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 100,
    },
    {
      title: 'gender',
      key: '性别',
      align: 'center',
      width: 100,
    },
    {
      title: '市/区',
      key: 'city',
      align: 'center',
      width: 100,
    },
    {
      title: '省',
      key: 'province',
      align: 'center',
      width: 100,
    },
    {
      title: 'year',
      key: 'year',
      align: 'center',
      width: 100,
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
