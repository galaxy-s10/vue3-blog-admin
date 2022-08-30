import { ChatbubbleEllipsesOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'comment',
    path: '/comment',
    component: Layout,
    meta: {
      title: '评论管理',
      sort: ROUTE_SORT.comment,
    },
    children: [
      {
        name: 'commentList',
        path: '/comment/list',
        component: () => import('@/views/comment/list/index.vue'),
        meta: {
          title: '评论列表',
          icon: renderIcon(ChatbubbleEllipsesOutline),
        },
      },
    ],
  },
];