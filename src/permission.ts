import router, { defaultRoutes } from './router';
// import store from './store';
import cache from '@/utils/cache';
import { useUserStore } from '@/store/user';
import { roleRoutes } from '@/router';
// 白名单，不需要登录即可跳转，如登录页
const whiteList = ['/login', '/oauth/qq_login'];

// const handleWhiteList = (routes) => {
//   routes.forEach((item) => {
//     if (whiteList.indexOf(item.path) === -1) {
//       whiteList.push(item.path);
//     }
//     if (item.children) {
//       handleWhiteList(item.children);
//     }
//   });
// };

// handleWhiteList(defaultRoutes);
console.log(whiteList);

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  console.log(to.path, from.path, 111);
  const { roles } = userStore.$state;
  const hasToken = cache.getCache('token');
  console.log(hasToken, 22222);
  // 先判断有没有登录
  if (hasToken) {
    if (to.path === '/login') {
      next();
    }
    // 判断用户有没有角色
    if (roles && roles.length) {
      console.log('有token,有角色', to.path);
      next();
    } else {
      console.log('有token,无角色', to.path);
      const roles = await userStore.getUserInfo();
      const myRole = roles.map((v) => v.role_name);
      // 比较两数组是否有交集(返回true代表有交集)
      const hasMixin = (a, b) => {
        return a.length + b.length !== new Set([...a, ...b]).size;
      };
      const generateAsyncRoutes = (roleRoutes) => {
        const deepFind = (tree) => {
          console.log(tree, 323);
          const newRoutes = tree.filter((v) => {
            if (v.meta && v.meta.roles) {
              const hasRole = hasMixin(v.meta.roles, myRole);
              if (hasRole) {
                return true;
              }
              return false;
            }
            return true;
          });
          newRoutes.forEach((v) => {
            if (v.children) {
              v.children = deepFind(v.children);
            }
          });
          return newRoutes;
        };

        return deepFind(roleRoutes);
      };

      const routeRes = generateAsyncRoutes(roleRoutes);
      console.log(routeRes, 8888);
      routeRes.forEach((v) => {
        console.log(v);
        router.addRoute(v);
      });
      console.log(roles, 886);
      next({ ...to, replace: true });
    }
    // window.$message.error('您没有任何权限!');
    // return false;
  }
  // 没登录的话，判断跳转的页面在不在白名单内
  if (whiteList.indexOf(to.path) !== -1) {
    console.log('ll', to.path);
    // return to.path;
    // router.push(to.path);
    next();
  }
  console.log('124', `/login?redirect=${to.path}`);
  next(`/login?redirect=${to.path}`);
});
