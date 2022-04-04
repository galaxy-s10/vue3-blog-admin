import router from './router';

import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import cache from '@/utils/cache';

// 白名单，不需要登录即可跳转，如登录页
const whiteList = [
  '/login',
  '/register',
  '/oauth/qq_login',
  '/oauth/github_login',
];

// eslint-disable-next-line consistent-return
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const { roles } = userStore;
  const hasToken = cache.getStorage('token');
  // 先判断有没有登录
  if (hasToken) {
    userStore.setToken(hasToken);
    if (to.path === '/login') {
      next('/');
    }
    // 判断用户有没有角色
    // @ts-ignore
    if (roles && roles.length) {
      next();
    } else {
      const { code, data }: any = await userStore.getUserInfo();
      if (code !== 200) {
        next(false);
        return;
      }
      if (!data.roles) {
        next(`/login`);
        return;
      }
      const routeRes = userStore.generateAsyncRoutes(data.roles);
      routeRes.forEach((v) => {
        router.addRoute(v);
      });
      appStore.setRoutes(routeRes);
      next({ ...to, replace: true });
      return;
    }
  } else {
    // 没登录的话，判断跳转的页面在不在白名单内
    if (whiteList.indexOf(to.path) !== -1) {
      return next();
    }
    next(`/login?redirect=${to.path}`);
  }
});
