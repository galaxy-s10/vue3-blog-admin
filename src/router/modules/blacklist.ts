import { AccessibilityOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'blacklist',
    path: '/blacklist',
    component: Layout,
    meta: {
      title: '黑名单管理',
      sort: ROUTE_SORT.blacklist,
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
