import { LockClosedOutline } from '@vicons/ionicons5';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'role',
    path: '/role',
    component: Layout,
    meta: {
      title: '角色管理',
      icon: renderIcon(LockClosedOutline),
      sort: ROUTE_SORT.role,
    },
    children: [
      {
        name: 'roleList',
        path: '/role/list',
        component: () => import('@/views/role/list/index.vue'),
        meta: {
          title: '角色列表',
        },
      },
      {
        name: 'roleTree',
        path: '/role/tree',
        component: () => import('@/views/role/tree/index.vue'),
        meta: {
          title: '角色树',
        },
      },
      {
        name: 'addRole',
        path: '/role/add',
        component: () => import('@/views/role/add/index.vue'),
        meta: {
          title: '添加角色',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
