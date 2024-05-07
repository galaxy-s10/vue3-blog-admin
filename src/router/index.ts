import { createRouter, createWebHistory } from 'vue-router';

import { routes as constantRoutes } from './constantRoutes';

export { routes as asyncRoutes } from './asyncRoutes';
export const defaultRoutes = constantRoutes;

const router = createRouter({
  routes: [...defaultRoutes],
  history: createWebHistory(),
});

export default router;
