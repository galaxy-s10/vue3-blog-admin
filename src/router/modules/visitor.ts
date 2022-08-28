import { FootstepsOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'visitor',
    path: '/visitor',
    component: Layout,
    meta: {
      title: '访客管理',
      sort: 80,
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
