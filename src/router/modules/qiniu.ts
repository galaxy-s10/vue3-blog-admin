import { CloudDownloadOutline } from '@vicons/ionicons5';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'qiniu',
    path: '/qiniu',
    component: Layout,
    meta: {
      title: '七牛云管理',
      icon: renderIcon(CloudDownloadOutline),
    },
    children: [
      {
        name: 'qiniuImageList',
        path: '/qiniu/imageList',
        component: () => import('@/views/qiniu/imageList/index.vue'),
        meta: {
          title: '图片列表',
        },
      },
      {
        name: 'qiniuMediaList',
        path: '/qiniu/mediaList',
        component: () => import('@/views/qiniu/mediaList/index.vue'),
        meta: {
          title: '媒体列表',
        },
      },
      {
        name: 'qiniuBackupsDatabaseList',
        path: '/qiniu/backupsDatabaseList',
        component: () => import('@/views/qiniu/backupsDatabaseList/index.vue'),
        meta: {
          title: '数据库列表',
        },
      },
      {
        name: 'qiniuNuxtBlog',
        path: '/qiniu/nuxtBlog',
        component: () => import('@/views/qiniu/nuxtBlog/index.vue'),
        meta: {
          title: 'nuxt博客',
        },
      },
      {
        name: 'addQiniu',
        path: '/qiniu/upload',
        component: () => import('@/views/qiniu/upload/index.vue'),
        meta: {
          title: '上传文件',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
];
