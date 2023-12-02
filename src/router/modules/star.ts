import { StarOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'star',
    path: '/star',
    component: Layout,
    meta: {
      title: '点赞管理',
      sort: ROUTE_SORT.star,
    },
    children: [
      {
        name: 'starList',
        path: '/star/list',
        component: () => import('@/views/star/list/index.vue'),
        meta: {
          title: '点赞列表',
          icon: renderIcon(StarOutline),
        },
      },
    ],
  },
];
