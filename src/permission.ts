import router from './router';
import cache from '@/utils/cache';
import { useUserStore } from '@/store/user';

// 白名单，不需要登录即可跳转，如登录页
const whiteList = ['/login', '/oauth/qq_login'];

// eslint-disable-next-line consistent-return
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const { roles } = userStore.$state;
  const hasToken = cache.getStorage('token');
  // 先判断有没有登录
  if (hasToken) {
    if (to.path === '/login') {
      next();
    }
    // 判断用户有没有角色
    if (roles && roles.length) {
      next();
    } else {
      const { roles } = await userStore.getUserInfo();
      const routeRes = userStore.generateAsyncRoutes(roles);
      routeRes.forEach((v) => {
        router.addRoute(v);
      });
      next({ ...to, replace: true });
    }
  } else {
    // 没登录的话，判断跳转的页面在不在白名单内
    if (whiteList.indexOf(to.path) !== -1) {
      return next();
    }
    next(`/login?redirect=${to.path}`);
  }
});
