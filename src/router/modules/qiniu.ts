import { CloudDownloadOutline } from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'qiniu',
    path: '/qiniu',
    component: Layout,
    meta: {
      title: '七牛云管理',
      icon: renderIcon(CloudDownloadOutline),
      sort: ROUTE_SORT.qiniu,
    },
    children: [
      {
        name: 'qiniuImageList',
        path: '/qiniu/imageList',
        component: () => import('@/views/qiniu/imageList/index.vue'),
        meta: {
          title: '图片资源',
        },
      },
      {
        name: 'qiniuBilldImageList',
        path: '/qiniu/billdImageList',
        component: () => import('@/views/qiniu/billdImageList/index.vue'),
        meta: {
          title: '直播图片资源',
        },
      },
      {
        name: 'qiniuMediaList',
        path: '/qiniu/mediaList',
        component: () => import('@/views/qiniu/mediaList/index.vue'),
        meta: {
          title: '媒体资源',
        },
      },
      {
        name: 'qiniuBackupsDatabaseList',
        path: '/qiniu/backupsDatabaseList',
        component: () => import('@/views/qiniu/backupsDatabaseList/index.vue'),
        meta: {
          title: '备份数据库资源',
        },
      },
      {
        name: 'qiniuNuxtBlogClient',
        path: '/qiniu/nuxtBlogClient',
        component: () => import('@/views/qiniu/nuxtBlogClient/index.vue'),
        meta: {
          title: '博客前台资源',
        },
      },
      {
        name: 'addQiniu',
        path: '/qiniu/upload',
        component: () => import('@/views/qiniu/upload/index.vue'),
        meta: {
          title: '上传文件',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
];
