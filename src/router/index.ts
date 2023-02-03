import { outputStaticUrl, NODE_ENV } from 'script/constant';
import { createRouter, createWebHistory } from 'vue-router';

import { routes as constantRoutes } from './constantRoutes';

export { routes as asyncRoutes } from './asyncRoutes';
export const defaultRoutes = constantRoutes;

const router = createRouter({
  routes: [...defaultRoutes],
  history: createWebHistory(outputStaticUrl(NODE_ENV === 'production')),
});

export default router;
