import { AlarmOutline } from '@vicons/ionicons5';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    path: '/monit',
    component: Layout,
    meta: {
      title: '监控管理',
      sort: ROUTE_SORT.monit,
    },
    children: [
      {
        name: 'monitlist',
        path: '/monit/list',
        component: () => import('@/views/monit/list/index.vue'),
        meta: {
          title: '监控列表',
          icon: renderIcon(AlarmOutline),
        },
      },
    ],
  },
];
