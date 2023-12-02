import {
  BagHandleOutline,
  CartOutline,
  ColorPaletteOutline,
  KeyOutline,
  SettingsOutline,
} from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

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
        meta: {
          title: '前台设置',
          icon: renderIcon(BagHandleOutline),
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
        children: [
          {
            name: 'frontendSettingList',
            path: '/setting/frontend/list',
            component: () => import('@/views/setting/frontend/list/index.vue'),
            meta: {
              title: '概览',
            },
          },
          {
            name: 'frontendSettingAdd',
            path: '/setting/frontend/add',
            component: () => import('@/views/setting/frontend/add/index.vue'),
            meta: {
              title: '新增',
            },
          },
          {
            name: 'frontendSettingEdit',
            path: '/setting/frontend/edit',
            component: () => import('@/views/setting/frontend/edit/index.vue'),
            meta: {
              title: '编辑',
              hidden: true,
            },
          },
        ],
      },
      {
        name: 'backendSetting',
        path: '/setting/backend',
        meta: {
          title: '后台设置',
          icon: renderIcon(CartOutline),
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
        children: [
          {
            name: 'backendSettingList',
            path: '/setting/backend/list',
            component: () => import('@/views/setting/backend/list/index.vue'),
            meta: {
              title: '概览',
            },
          },
          {
            name: 'backendSettingAdd',
            path: '/setting/backend/add',
            component: () => import('@/views/setting/backend/add/index.vue'),
            meta: {
              title: '新增',
            },
          },
          {
            name: 'backendSettingEdit',
            path: '/setting/backend/edit',
            component: () => import('@/views/setting/backend/edit/index.vue'),
            meta: {
              title: '编辑',
              hidden: true,
            },
          },
        ],
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
