import { routes as notFoundRoutes } from './notFound';

import type { RouteRecordRaw } from 'vue-router';

const allModules: any = [];

// @ts-ignore
const requireModels = require.context('./modules', true, /.ts$/);

requireModels.keys().forEach((v) => {
  const filename = v.replace('./', '');
  // eslint-disable-next-line global-require
  const arr = require(`./modules/${filename}`).routes;
  allModules.push(...arr);
});

// 异步路由
export const routes: RouteRecordRaw[] = [
  ...allModules,
  ...notFoundRoutes, // 404路由一定要放在异步路由的最后
];
