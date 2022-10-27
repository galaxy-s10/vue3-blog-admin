import { CodeSlashOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'article',
    path: '/article',
    component: Layout,
    meta: {
      title: '文章管理',
      icon: renderIcon(CodeSlashOutline),
      sort: ROUTE_SORT.article,
    },
    children: [
      {
        name: 'articleList',
        path: '/article/list',
        component: () => import('@/views/article/list/index.vue'),
        meta: {
          title: '文章列表',
        },
      },
      {
        name: 'addArticle',
        path: '/article/add',
        component: () => import('@/views/article/add'),
        meta: {
          title: '添加文章',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
      {
        name: 'updateArticle',
        path: '/article/update',
        component: () => import('@/views/article/update/index.vue'),
        meta: {
          title: '编辑文章',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
