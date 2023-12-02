import { ColorPaletteOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'theme',
    path: '/theme',
    component: Layout,
    meta: {
      title: '主题管理',
      icon: renderIcon(ColorPaletteOutline),
      sort: ROUTE_SORT.theme,
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
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
