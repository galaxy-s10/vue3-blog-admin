import {
  BuildOutline,
  ServerOutline,
  TimeOutline,
  WarningOutline,
  ApertureOutline,
} from '@vicons/ionicons5';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'schedule',
    path: '/schedule',
    component: Layout,
    meta: {
      title: '定时任务',
      icon: renderIcon(TimeOutline),
      sort: ROUTE_SORT.schedule,
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
        name: 'scheduleRestartPm2',
        path: '/schedule/restartPm2',
        component: () => import('@/views/schedule/restartPm2/restartPm2.vue'),
        meta: {
          title: '重启pm2任务',
          icon: renderIcon(ApertureOutline),
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
