import { RocketOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'works',
    path: '/works',
    component: Layout,
    meta: {
      title: '作品管理',
      icon: renderIcon(RocketOutline),
    },
    children: [
      {
        name: 'worksList',
        path: '/works/list',
        component: () => import('@/views/works/list/index.vue'),
        meta: {
          title: '作品列表',
        },
      },
      {
        name: 'addWorks',
        path: '/works/add',
        component: () => import('@/views/works/add/index.vue'),
        meta: {
          title: '添加作品',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
];
