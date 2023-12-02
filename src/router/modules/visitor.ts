import { FootstepsOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'visitor',
    path: '/visitor',
    component: Layout,
    meta: {
      title: '访客管理',
      sort: ROUTE_SORT.visitor,
    },
    children: [
      {
        name: 'visitorList',
        path: '/visitor/list',
        component: () => import('@/views/visitor/list/index.vue'),
        meta: {
          title: '访客列表',
          icon: renderIcon(FootstepsOutline),
        },
      },
    ],
  },
];
