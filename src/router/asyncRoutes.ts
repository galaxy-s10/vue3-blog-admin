import { routes as notFoundRoutes } from './notFound';

import type { RouteRecordRaw } from 'vue-router';

// 异步路由
export const routes = (): RouteRecordRaw[] => {
  const allModules: any = [];

  const requireModels = import.meta.glob('./modules/*.ts', { eager: true });
  Object.keys(requireModels).forEach((key) => {
    // @ts-ignore
    allModules.push(...requireModels[key].routes);
  });

  return [
    ...allModules,
    ...notFoundRoutes, // 404路由一定要放在异步路由的最后
  ];
};
