import { AnalyticsOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'buryingPoint',
    path: '/buryingPoint',
    component: Layout,
    meta: {
      title: '埋点管理',
      sort: ROUTE_SORT.buryingPoint,
    },
    children: [
      {
        name: 'buryingPointList',
        path: '/buryingPoint/list',
        component: () => import('@/views/buryingPoint/list/index.vue'),
        meta: {
          title: '埋点列表',
          icon: renderIcon(AnalyticsOutline),
        },
      },
    ],
  },
];
