import { MusicalNotesOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'music',
    path: '/music',
    component: Layout,
    meta: {
      title: '音乐管理',
      icon: renderIcon(MusicalNotesOutline),
      sort: 30,
    },
    children: [
      {
        name: 'musicList',
        path: '/music/list',
        component: () => import('@/views/music/list/index.vue'),
        meta: {
          title: '音乐列表',
        },
      },
      {
        name: 'addMusic',
        path: '/music/add',
        component: () => import('@/views/music/add/index.vue'),
        meta: {
          title: '添加音乐',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
];
