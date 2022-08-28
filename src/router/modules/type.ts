import { FolderOpenOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'type',
    path: '/type',
    component: Layout,
    meta: {
      title: '分类管理',
      icon: renderIcon(FolderOpenOutline),
      sort: 30,
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
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
];
