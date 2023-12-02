import {
  BugOutline,
  CloudyOutline,
  SpeedometerOutline,
} from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from './utils';

// 默认路由
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    meta: {
      sort: ROUTE_SORT.dashboard,
    },
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '控制台',
          icon: renderIcon(SpeedometerOutline),
        },
      },
    ],
  },
  {
    path: '/oauth/:method',
    name: 'oauth',
    meta: {
      title: '授权页面',
      hidden: true,
    },
    component: () => import('@/views/oauth/oauth.vue'),
  },
  {
    name: 'error',
    path: '/error',
    component: Layout,
    meta: {
      title: '错误页面',
      icon: renderIcon(BugOutline),
      sort: ROUTE_SORT.error,
    },
    children: [
      {
        name: 'authError',
        path: '/error/401',
        component: () => import('@/views/error/401/index.vue'),
        meta: {
          title: '401页面',
        },
      },
      {
        name: 'notFound',
        path: '/error/404',
        component: () => import('@/views/error/404/index.vue'),
        meta: {
          title: '404页面',
        },
      },
      {
        name: 'serverError',
        path: '/error/500',
        component: () => import('@/views/error/500/index.vue'),
        meta: {
          title: '500页面',
        },
      },
    ],
  },
  {
    path: '/log',
    component: Layout,
    meta: {
      title: '日志管理',
      sort: ROUTE_SORT.log,
    },
    children: [
      {
        name: 'loglist',
        path: '/log/list',
        component: () => import('@/views/log/list/index.vue'),
        meta: {
          title: '日志列表',
          icon: renderIcon(CloudyOutline),
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
];
