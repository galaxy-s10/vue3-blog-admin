import { PricetagsOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'tag',
    path: '/tag',
    component: Layout,
    meta: {
      title: '标签管理',
      icon: renderIcon(PricetagsOutline),
      sort: ROUTE_SORT.tag,
    },
    children: [
      {
        name: 'tagList',
        path: '/tag/list',
        component: () => import('@/views/tag/list/index.vue'),
        meta: {
          title: '标签列表',
        },
      },
      {
        name: 'addTag',
        path: '/tag/add',
        component: () => import('@/views/tag/add/index.vue'),
        meta: {
          title: '添加标签',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
