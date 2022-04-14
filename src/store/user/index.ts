import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

import { fetchEmailCodeLogin, fetchRegister } from '@/api/emailUser';
import { fetchLogin, fetchUserInfo } from '@/api/user';
import { IRole } from '@/interface';
import { asyncRoutes } from '@/router';
import cache from '@/utils/cache';

type RootState = {
  userInfo: {
    id: number;
    username: string;
    status: number;
    avatar: string;
    title: string;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    send_comments_total: number;
    receive_comments_total: number;
    send_stars_total: number;
    receive_stars_total: number;
    articles_total: number;
    qq_users: any[];
    github_users: any[];
    email_users: any[];
    roles: IRole[];
  } | null;
  token: string | null;
  roles: string[] | null;
};

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: null,
      token: null,
      roles: null,
    } as RootState;
  },
  actions: {
    setUserInfo(res) {
      this.userInfo = res;
    },
    setToken(res) {
      console.log('first setToken', res);
      Cookies.remove('token');
      cache.setStorageExp('token', res, 24);
      this.token = res;
    },
    setRoles(res) {
      this.roles = res;
    },
    logout() {
      cache.clearStorage('token');
      Cookies.remove('token');
      this.token = null;
      this.userInfo = null;
      this.roles = null;
    },
    async pwdLogin({ id, password }) {
      try {
        const { data: token } = await fetchLogin({
          id,
          password,
        });
        this.setToken(token);
        return token;
      } catch (error: any) {
        // 错误返回401，全局的响应拦截会打印报错信息
        return null;
      }
    },
    async codeLogin({ email, code }) {
      try {
        const { data: token } = await fetchEmailCodeLogin({
          email,
          code,
        });
        this.setToken(token);
        return token;
      } catch (error: any) {
        // 错误返回401，全局的响应拦截会打印报错信息
        return null;
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
      const myRole = roles.map((v) => v.role_value);
      const handleAsyncRoutes = (roleRoutes) => {
        const deepFind = (route) => {
          const res: any[] = [];
          route.forEach((v) => {
            const t = { ...v };
            if (t.meta && t.meta.roles) {
              const hasRole = hasMixin(t.meta.roles, myRole);
              hasRole && res.push(t);
            } else {
              res.push(t);
            }
            if (t.children) {
              t.children = deepFind(t.children);
            }
          });
          return res;
        };
        const res = deepFind(roleRoutes);

        return res;
      };
      return handleAsyncRoutes(asyncRoutes);
    },
  },
});
