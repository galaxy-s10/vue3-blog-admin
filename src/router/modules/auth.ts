import { ShieldOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'auth',
    path: '/auth',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: renderIcon(ShieldOutline),
    },
    children: [
      {
        name: 'authList',
        path: '/auth/list',
        component: () => import('@/views/auth/list/index.vue'),
        meta: {
          title: '权限列表',
        },
      },
      {
        name: 'addAuth',
        path: '/auth/add',
        component: () => import('@/views/auth/add/index.vue'),
        meta: {
          title: '添加权限',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
];
