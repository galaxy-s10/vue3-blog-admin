import { AlarmOutline, CodeSlashOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    path: '/monit',
    component: Layout,
    meta: { title: '监控管理', sort: 80 },
    children: [
      {
        name: 'monitlist',
        path: '/monit/list',
        component: () => import('@/views/monit/list/index.vue'),
        meta: {
          title: '监控列表',
          icon: renderIcon(AlarmOutline),
        },
      },
    ],
  },
];
