import {
  BagHandleOutline,
  ColorPaletteOutline,
  KeyOutline,
  SettingsOutline,
} from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'setting',
    path: '/setting',
    component: Layout,
    meta: {
      title: '设置',
      icon: renderIcon(SettingsOutline),
      sort: ROUTE_SORT.setting,
    },
    children: [
      {
        name: 'frontendSetting',
        path: '/setting/frontend',
        component: () => import('@/views/setting/frontend'),
        meta: {
          title: '前台设置',
          icon: renderIcon(BagHandleOutline),
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
      {
        name: 'themeSetting',
        path: '/setting/theme',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '主题设置',
          icon: renderIcon(ColorPaletteOutline),
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
      {
        name: 'accountSetting',
        path: '/setting/account',
        component: () => import('@/views/setting/account/index.vue'),
        meta: {
          title: '账号设置',
          icon: renderIcon(KeyOutline),
        },
      },
    ],
  },
];
