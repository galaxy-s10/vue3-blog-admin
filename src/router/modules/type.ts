import { FolderOpenOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'type',
    path: '/type',
    component: Layout,
    meta: {
      title: '分类管理',
      icon: renderIcon(FolderOpenOutline),
      sort: ROUTE_SORT.type,
    },
    children: [
      {
        name: 'typeList',
        path: '/type/list',
        component: () => import('@/views/type/list/index.vue'),
        meta: {
          title: '分类列表',
        },
      },
      {
        name: 'addType',
        path: '/type/add',
        component: () => import('@/views/type/add/index.vue'),
        meta: {
          title: '添加分类',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
