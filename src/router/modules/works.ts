import { RocketOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'works',
    path: '/works',
    component: Layout,
    meta: {
      title: '作品管理',
      icon: renderIcon(RocketOutline),
      sort: ROUTE_SORT.works,
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
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
