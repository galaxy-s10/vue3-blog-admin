import { FootstepsOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'visitorLog',
    path: '/visitorLog',
    component: Layout,
    meta: {
      title: '访客管理',
      sort: ROUTE_SORT.visitorLog,
    },
    children: [
      {
        name: 'visitorLogList',
        path: '/visitorLog/list',
        component: () => import('@/views/visitorLog/list/index.vue'),
        meta: {
          title: '访客列表',
          icon: renderIcon(FootstepsOutline),
        },
      },
    ],
  },
];
