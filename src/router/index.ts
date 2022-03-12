import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import {
  AddOutline,
  ChatbubbleEllipsesOutline,
  CodeSlashOutline,
  ColorPaletteOutline,
  FolderOpenOutline,
  LinkOutline,
  PawOutline,
  ListOutline,
  LockClosedOutline,
  MusicalNotesOutline,
  PeopleOutline,
  PersonAddOutline,
  PricetagsOutline,
  SettingsOutline,
  KeyOutline,
  ShieldOutline,
  SpeedometerOutline,
  StarOutline,
  BugOutline,
  CloudDoneOutline,
} from '@vicons/ionicons5';
import Layout from '@/layout/index.vue';
import localCache from '@/utils/cache';

export const iconMap = (name) => {
  const ico = {
    AddOutline,
    ChatbubbleEllipsesOutline,
    CodeSlashOutline,
    ColorPaletteOutline,
    FolderOpenOutline,
    LinkOutline,
    PawOutline,
    ListOutline,
    LockClosedOutline,
    MusicalNotesOutline,
    PeopleOutline,
    PersonAddOutline,
    PricetagsOutline,
    SettingsOutline,
    KeyOutline,
    ShieldOutline,
    SpeedometerOutline,
    StarOutline,
    BugOutline,
    CloudDoneOutline,
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
    component: () => import('@/views/oauth/index.vue'),
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
    meta: { title: '日志管理', icon: 'CloudDoneOutline' },
    children: [
      {
        name: 'list',
        path: '/log/list',
        component: () => import('@/views/log/list/index.vue'),
        meta: {
          title: '日志列表',
          icon: 'ListOutline',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '后台登录',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
];
// 权限路由
export const roleRoutes = [
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
        },
      },
      {
        name: 'accountSetting',
        path: '/setting/account',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '账号设置',
          icon: 'KeyOutline',
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
      icon: 'StarOutline',
    },
    children: [
      {
        name: 'starList',
        path: '/star/list',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '点赞列表',
          icon: 'ListOutline',
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
      icon: 'LinkOutline',
    },
    children: [
      {
        name: 'linkList',
        path: '/link/list',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '友链列表',
          icon: 'ListOutline',
        },
      },
      {
        name: 'addLink',
        path: '/link/add',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '添加友链',
          icon: 'AddOutline',
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
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '音乐列表',
          icon: 'ListOutline',
        },
      },
      {
        name: 'addMusic',
        path: '/music/add',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '添加音乐',
          icon: 'AddOutline',
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
      icon: 'ChatbubbleEllipsesOutline',
    },
    children: [
      {
        name: 'commentList',
        path: '/comment/list',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '评论列表',
          icon: 'ListOutline',
        },
      },
      {
        name: 'addComment',
        path: '/comment/add',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '添加评论',
          icon: 'AddOutline',
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
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '文章列表',
          icon: 'ListOutline',
        },
      },
      {
        name: 'addArticle',
        path: '/article/add',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '添加文章',
          icon: 'AddOutline',
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
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '标签列表',
          icon: 'ListOutline',
        },
      },
      {
        name: 'addTag',
        path: '/tag/add',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '添加标签',
          icon: 'AddOutline',
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
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '分类列表',
          icon: 'ListOutline',
        },
      },
      {
        name: 'addType',
        path: '/type/add',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '添加分类',
          icon: 'AddOutline',
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
      icon: 'PeopleOutline',
    },
    children: [
      {
        name: 'userList',
        path: '/user/list',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '站内用户',
        },
      },
      {
        name: 'userQQList',
        path: '/user/qqlist',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: 'qq用户',
        },
      },
      {
        name: 'addUser',
        path: '/user/add',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '添加用户',
          icon: 'PersonAddOutline',
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
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '角色列表',
          icon: 'ListOutline',
        },
      },
      {
        name: 'addRole',
        path: '/role/add',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '添加角色',
          icon: 'AddOutline',
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
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '权限列表',
          icon: 'ListOutline',
        },
      },
      {
        name: 'addAuth',
        path: '/auth/add',
        component: () => import('@/views/setting/theme/index.vue'),
        meta: {
          title: '添加权限',
          icon: 'AddOutline',
        },
      },
    ],
  },
];
const router = createRouter({
  routes: [...defaultRoutes, ...roleRoutes],
  history: createWebHistory(),
});

// eslint-disable-next-line consistent-return
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token');
    if (!token) {
      // return '/login';
    }
  }
});

export default router;
