import { ColorPaletteOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'theme',
    path: '/theme',
    component: Layout,
    meta: {
      title: '主题管理',
      icon: renderIcon(ColorPaletteOutline),
    },
    children: [
      {
        name: 'themeList',
        path: '/theme/list',
        component: () => import('@/views/theme/list/index.vue'),
        meta: {
          title: '主题列表',
        },
      },
      {
        name: 'addTheme',
        path: '/theme/add',
        component: () => import('@/views/theme/add/index.vue'),
        meta: {
          title: '添加主题',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
];
