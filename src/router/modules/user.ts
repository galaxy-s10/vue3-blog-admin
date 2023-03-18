import { PersonOutline } from '@vicons/ionicons5';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'user',
    path: '/user',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: renderIcon(PersonOutline),
      sort: ROUTE_SORT.user,
    },
    children: [
      {
        name: 'userList',
        path: '/user/list',
        component: () => import('@/views/user/list/index.vue'),
        meta: {
          title: '用户列表',
        },
      },
      {
        name: 'userAdd',
        path: '/user/add',
        component: () => import('@/views/user/add/index.vue'),
        meta: {
          title: '新增用户',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
