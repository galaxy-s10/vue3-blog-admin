import {
  BugOutline,
  ChatbubbleEllipsesOutline,
  CloudyOutline,
  CodeSlashOutline,
  ColorPaletteOutline,
  FolderOpenOutline,
  KeyOutline,
  InfiniteOutline,
  LockClosedOutline,
  MusicalNotesOutline,
  PawOutline,
  PeopleOutline,
  PricetagsOutline,
  SettingsOutline,
  ShieldOutline,
  SpeedometerOutline,
  StarOutline,
  ServerOutline,
  TimeOutline,
  RocketOutline,
  BuildOutline,
  FootstepsOutline,
  PersonOutline,
} from '@vicons/ionicons5';
import { createRouter, createWebHistory } from 'vue-router';

import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

export const iconMap = (name) => {
  const ico = {
    ChatbubbleEllipsesOutline,
    CodeSlashOutline,
    ColorPaletteOutline,
    FolderOpenOutline,
    InfiniteOutline,
    PawOutline,
    LockClosedOutline,
    MusicalNotesOutline,
    PeopleOutline,
    PricetagsOutline,
    SettingsOutline,
    KeyOutline,
    ShieldOutline,
    SpeedometerOutline,
    StarOutline,
    BugOutline,
    CloudyOutline,
    ServerOutline,
    TimeOutline,
    RocketOutline,
    BuildOutline,
    FootstepsOutline,
    PersonOutline,
  };
  return ico[name];
};

// 默认路由
export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '控制台',
          icon: 'SpeedometerOutline',
        },
      },
    ],
  },
  {
    path: '/oauth/:method',
    name: 'oauth',
    meta: {
      title: '授权页面',
      hidden: true,
    },
    component: () => import('@/views/oauth/oauth.vue'),
  },
  {
    name: 'error',
    path: '/error',
    component: Layout,
    meta: {
      title: '错误页面',
      icon: 'BugOutline',
    },
    children: [
      {
        name: 'authError',
        path: '/error/401',
        component: () => import('@/views/error/401/index.vue'),
        meta: {
          title: '401页面',
        },
      },
      {
        name: 'notFound',
        path: '/error/404',
        component: () => import('@/views/error/404/index.vue'),
        meta: {
          title: '404页面',
        },
      },
      {
        name: 'serverError',
        path: '/error/500',
        component: () => import('@/views/error/500/index.vue'),
        meta: {
          title: '500页面',
        },
      },
    ],
  },
  {
    path: '/log',
    component: Layout,
    meta: { title: '日志管理' },
    children: [
      {
        name: 'loglist',
        path: '/log/list',
        component: () => import('@/views/log/list/index.vue'),
        meta: {
          title: '日志列表',
          icon: 'CloudyOutline',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
];

// 异步路由
export const asyncRoutes = [
  {
    name: 'setting',
    path: '/setting',
    component: Layout,
    meta: {
      title: '设置',
      icon: 'SettingsOutline',
    },
    children: [
      {
        name: 'themeSetting',
        path: '/setting/theme',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '主题设置',
          icon: 'ColorPaletteOutline',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
      {
        name: 'accountSetting',
        path: '/setting/account',
        component: () => import('@/views/setting/account/index.vue'),
        meta: {
          title: '账号设置',
          icon: 'KeyOutline',
        },
      },
    ],
  },
  {
    name: 'visitor',
    path: '/visitor',
    component: Layout,
    meta: {
      title: '访客管理',
    },
    children: [
      {
        name: 'visitorList',
        path: '/visitor/list',
        component: () => import('@/views/visitor/list/index.vue'),
        meta: {
          title: '访客列表',
          icon: 'FootstepsOutline',
        },
      },
    ],
  },
  {
    name: 'article',
    path: '/article',
    component: Layout,
    meta: {
      title: '文章管理',
      icon: 'CodeSlashOutline',
    },
    children: [
      {
        name: 'articleList',
        path: '/article/list',
        component: () => import('@/views/article/list/index.vue'),
        meta: {
          title: '文章列表',
        },
      },
      {
        name: 'addArticle',
        path: '/article/add',
        component: () => import('@/views/article/add'),
        meta: {
          title: '添加文章',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
      {
        name: 'updateArticle',
        path: '/article/update',
        component: () => import('@/views/article/update/index.vue'),
        meta: {
          title: '编辑文章',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
  {
    name: 'comment',
    path: '/comment',
    component: Layout,
    meta: {
      title: '评论管理',
    },
    children: [
      {
        name: 'commentList',
        path: '/comment/list',
        component: () => import('@/views/comment/list/index.vue'),
        meta: {
          title: '评论列表',
          icon: 'ChatbubbleEllipsesOutline',
        },
      },
    ],
  },
  {
    name: 'star',
    path: '/star',
    component: Layout,
    meta: {
      title: '点赞管理',
    },
    children: [
      {
        name: 'starList',
        path: '/star/list',
        component: () => import('@/views/star/list/index.vue'),
        meta: {
          title: '点赞列表',
          icon: 'StarOutline',
        },
      },
    ],
  },
  {
    name: 'theme',
    path: '/theme',
    component: Layout,
    meta: {
      title: '主题管理',
      icon: 'ColorPaletteOutline',
    },
    children: [
      {
        name: 'themeList',
        path: '/theme/list',
        component: () => import('@/views/theme/list/index.vue'),
        meta: {
          title: '主题列表',
        },
      },
      {
        name: 'addTheme',
        path: '/theme/add',
        component: () => import('@/views/theme/add/index.vue'),
        meta: {
          title: '添加主题',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
  {
    name: 'link',
    path: '/link',
    component: Layout,
    meta: {
      title: '友链管理',
      icon: 'InfiniteOutline',
    },
    children: [
      {
        name: 'linkList',
        path: '/link/list',
        component: () => import('@/views/link/list/index.vue'),
        meta: {
          title: '友链列表',
        },
      },
      {
        name: 'addLink',
        path: '/link/add',
        component: () => import('@/views/link/add/index.vue'),
        meta: {
          title: '添加友链',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
  {
    name: 'music',
    path: '/music',
    component: Layout,
    meta: {
      title: '音乐管理',
      icon: 'MusicalNotesOutline',
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

  {
    name: 'tag',
    path: '/tag',
    component: Layout,
    meta: {
      title: '标签管理',
      icon: 'PricetagsOutline',
    },
    children: [
      {
        name: 'tagList',
        path: '/tag/list',
        component: () => import('@/views/tag/list/index.vue'),
        meta: {
          title: '标签列表',
        },
      },
      {
        name: 'addTag',
        path: '/tag/add',
        component: () => import('@/views/tag/add/index.vue'),
        meta: {
          title: '添加标签',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
  {
    name: 'type',
    path: '/type',
    component: Layout,
    meta: {
      title: '分类管理',
      icon: 'FolderOpenOutline',
    },
    children: [
      {
        name: 'typeList',
        path: '/type/list',
        component: () => import('@/views/type/list/index.vue'),
        meta: {
          title: '分类列表',
        },
      },
      {
        name: 'addType',
        path: '/type/add',
        component: () => import('@/views/type/add/index.vue'),
        meta: {
          title: '添加分类',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
  {
    name: 'works',
    path: '/works',
    component: Layout,
    meta: {
      title: '作品管理',
      icon: 'RocketOutline',
    },
    children: [
      {
        name: 'worksList',
        path: '/works/list',
        component: () => import('@/views/works/list/index.vue'),
        meta: {
          title: '作品列表',
        },
      },
      {
        name: 'addWorks',
        path: '/works/add',
        component: () => import('@/views/works/add/index.vue'),
        meta: {
          title: '添加作品',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
  {
    name: 'user',
    path: '/user',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'PersonOutline',
    },
    children: [
      {
        name: 'userList',
        path: '/user/list',
        component: () => import('@/views/user/list/index.vue'),
        meta: {
          title: '用户列表',
        },
      },
      {
        name: 'userAdd',
        path: '/user/add',
        component: () => import('@/views/user/add/index.vue'),
        meta: {
          title: '新增用户',
        },
      },
    ],
  },
  {
    name: 'role',
    path: '/role',
    component: Layout,
    meta: {
      title: '角色管理',
      icon: 'LockClosedOutline',
    },
    children: [
      {
        name: 'roleList',
        path: '/role/list',
        component: () => import('@/views/role/list/index.vue'),
        meta: {
          title: '角色列表',
        },
      },
      {
        name: 'addRole',
        path: '/role/add',
        component: () => import('@/views/role/add/index.vue'),
        meta: {
          title: '添加角色',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
  {
    name: 'auth',
    path: '/auth',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: 'ShieldOutline',
    },
    children: [
      {
        name: 'authList',
        path: '/auth/list',
        component: () => import('@/views/auth/list/index.vue'),
        meta: {
          title: '权限列表',
        },
      },
      {
        name: 'addAuth',
        path: '/auth/add',
        component: () => import('@/views/auth/add/index.vue'),
        meta: {
          title: '添加权限',
          roles: ['ALL_ROLE', 'SUPER_ADMIN'],
        },
      },
    ],
  },
  {
    name: 'thirdUser',
    path: '/thirdUser',
    component: Layout,
    meta: {
      title: '第三方用户',
      icon: 'PeopleOutline',
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
  {
    name: 'schedule',
    path: '/schedule',
    component: Layout,
    meta: {
      title: '定时任务',
      icon: 'TimeOutline',
    },
    children: [
      {
        name: 'scheduleOther',
        path: '/schedule/other',
        component: () => import('@/views/schedule/other/other.vue'),
        meta: {
          title: '其他任务',
          icon: 'BuildOutline',
        },
      },
      {
        name: 'scheduleBackups',
        path: '/schedule/backups',
        component: () => import('@/views/schedule/backups/backups.vue'),
        meta: {
          title: '备份任务',
          icon: 'ServerOutline',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    // component: () => import('@/views/error/404/index.vue'),
    redirect: '/error/404',
  },
];

const router = createRouter({
  routes: [...defaultRoutes],
  history: createWebHistory(),
});

export default router;
