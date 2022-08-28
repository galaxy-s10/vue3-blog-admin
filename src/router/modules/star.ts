import { StarOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'star',
    path: '/star',
    component: Layout,
    meta: {
      title: '点赞管理',
      sort: 5,
    },
    children: [
      {
        name: 'starList',
        path: '/star/list',
        component: () => import('@/views/star/list/index.vue'),
        meta: {
          title: '点赞列表',
          icon: renderIcon(StarOutline),
        },
      },
    ],
  },
];
