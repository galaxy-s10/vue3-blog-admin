import {
  BuildOutline,
  ServerOutline,
  TimeOutline,
  WarningOutline,
} from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'schedule',
    path: '/schedule',
    component: Layout,
    meta: {
      title: '定时任务',
      icon: renderIcon(TimeOutline),
    },
    children: [
      {
        name: 'scheduleBackups',
        path: '/schedule/backups',
        component: () => import('@/views/schedule/backups/backups.vue'),
        meta: {
          title: '备份任务',
          icon: renderIcon(ServerOutline),
        },
      },
      {
        name: 'scheduleMemory',
        path: '/schedule/memory',
        component: () => import('@/views/schedule/memory/memory.vue'),
        meta: {
          title: '内存任务',
          icon: renderIcon(WarningOutline),
        },
      },
      {
        name: 'scheduleOther',
        path: '/schedule/other',
        component: () => import('@/views/schedule/other/other.vue'),
        meta: {
          title: '其他任务',
          icon: renderIcon(BuildOutline),
        },
      },
    ],
  },
];
