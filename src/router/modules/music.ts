import { MusicalNotesOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'music',
    path: '/music',
    component: Layout,
    meta: {
      title: '音乐管理',
      icon: renderIcon(MusicalNotesOutline),
      sort: ROUTE_SORT.music,
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
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
