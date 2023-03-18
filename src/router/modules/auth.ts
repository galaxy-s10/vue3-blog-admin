import { ShieldOutline } from '@vicons/ionicons5';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'auth',
    path: '/auth',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: renderIcon(ShieldOutline),
      sort: ROUTE_SORT.auth,
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
        name: 'authTree',
        path: '/auth/tree',
        component: () => import('@/views/auth/tree/index.vue'),
        meta: {
          title: '权限树',
        },
      },
      {
        name: 'addAuth',
        path: '/auth/add',
        component: () => import('@/views/auth/add/index.vue'),
        meta: {
          title: '添加权限',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
