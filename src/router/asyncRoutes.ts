import { routes as articleRoutes } from './modules/article';
import { routes as authRoutes } from './modules/auth';
import { routes as commentRoutes } from './modules/comment';
import { routes as linkRoutes } from './modules/link';
import { routes as monitRoutes } from './modules/monit';
import { routes as musicRoutes } from './modules/music';
import { routes as qiniuRoutes } from './modules/qiniu';
import { routes as roleRoutes } from './modules/role';
import { routes as scheduleRoutes } from './modules/schedule';
import { routes as settingRoutes } from './modules/setting';
import { routes as starRoutes } from './modules/star';
import { routes as tagRoutes } from './modules/tag';
import { routes as themeRoutes } from './modules/theme';
import { routes as thirdUserRoutes } from './modules/thirdUser';
import { routes as typeRoutes } from './modules/type';
import { routes as userRoutes } from './modules/user';
import { routes as visitorRoutes } from './modules/visitor';
import { routes as worksRoutes } from './modules/works';
import { routes as notFoundRoutes } from './notFound';

import type { RouteRecordRaw } from 'vue-router';

// 异步路由
export const routes: RouteRecordRaw[] = [
  ...articleRoutes,
  ...authRoutes,
  ...commentRoutes,
  ...linkRoutes,
  ...monitRoutes,
  ...musicRoutes,
  ...qiniuRoutes,
  ...roleRoutes,
  ...scheduleRoutes,
  ...settingRoutes,
  ...starRoutes,
  ...tagRoutes,
  ...themeRoutes,
  ...thirdUserRoutes,
  ...typeRoutes,
  ...userRoutes,
  ...visitorRoutes,
  ...worksRoutes,
  ...notFoundRoutes, //404路由一定要放在异步路由的最后
];
