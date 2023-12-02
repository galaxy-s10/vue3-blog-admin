import { PeopleOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'thirdUser',
    path: '/thirdUser',
    component: Layout,
    meta: {
      title: '第三方用户',
      icon: renderIcon(PeopleOutline),
      sort: ROUTE_SORT.thirdUser,
    },
    children: [
      {
        name: 'thirdUserQQ',
        path: '/thirdUser/qq',
        component: () => import('@/views/thirdUser/qq/index.vue'),
        meta: {
          title: 'qq',
        },
      },
      {
        name: 'thirdUserGithubList',
        path: '/thirdUser/github',
        component: () => import('@/views/thirdUser/github/index.vue'),
        meta: {
          title: 'github',
        },
      },
      {
        name: 'thirdUserEmailList',
        path: '/thirdUser/email',
        component: () => import('@/views/thirdUser/email/index.vue'),
        meta: {
          title: '邮箱',
        },
      },
    ],
  },
];
