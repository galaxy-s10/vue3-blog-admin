import { AccessibilityOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'blacklist',
    path: '/blacklist',
    component: Layout,
    meta: {
      title: '黑名单管理',
      sort: 80,
    },
    children: [
      {
        name: 'blacklistList',
        path: '/blacklist/list',
        component: () => import('@/views/blacklist/list/index.vue'),
        meta: {
          title: '黑名单列表',
          icon: renderIcon(AccessibilityOutline),
        },
      },
    ],
  },
];
