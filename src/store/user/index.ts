import { defineStore } from 'pinia';

import {
  fetchCodeLogin,
  fetchLogin,
  fetchRegister,
  fetchUserInfo,
} from '@/api/user';
import { asyncRoutes } from '@/router';
import cache from '@/utils/cache';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: null,
      token: null,
      roles: null,
    };
  },
  actions: {
    setUserInfo(res) {
      this.userInfo = res;
    },
    setToken(res) {
      cache.setStorage('token', res);
      this.token = res;
    },
    setRoles(res) {
      this.roles = res;
    },
    async login({ email, password, code }): Promise<{
      token?: string;
    }> {
      try {
        // @ts-ignore
        const { data: token } = code
          ? await fetchCodeLogin({
              email,
              code,
            })
          : await fetchLogin({
              email,
              password,
            });
        this.setToken(token);
        return { token };
      } catch (error: any) {
        // 错误返回401，全局的响应拦截会打印报错信息
        return error;
      }
    },
    async register({ email, code }) {
      try {
        // @ts-ignore
        const { data: token } = await fetchRegister({
          email,
          code,
        });
        this.setToken(token);
        return { token };
      } catch (error: any) {
        window.$message.error(error.message);
        return error;
      }
    },
    async getUserInfo() {
      try {
        const { code, data }: any = await fetchUserInfo();
        this.setUserInfo(data);
        this.setRoles(data.roles);
        console.log(code, data);
        return { code, data };
      } catch (error) {
        return error;
      }
    },
    generateAsyncRoutes(roles) {
      // 比较两数组是否有交集(返回true代表有交集)
      const hasMixin = (a, b) => {
        return a.length + b.length !== new Set([...a, ...b]).size;
      };
      const myRole = roles.map((v) => v.role_name);
      const handleAsyncRoutes = (roleRoutes) => {
        const deepFind = (tree) => {
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
      return handleAsyncRoutes(asyncRoutes);
    },
  },
});
