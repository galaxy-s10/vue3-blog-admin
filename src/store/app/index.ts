import { defineStore } from 'pinia';

import cache from '@/utils/cache';
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      env: 'prod',
      path: null,
      routes: [],
      tabList: {},
    };
  },
  actions: {
    setEnv(res) {
      this.env = res;
      cache.setStorageExp('env', res, 24);
    },
    setPath(res) {
      this.path = res;
    },
    setRoutes(res) {
      this.routes = res;
    },
    setTabList(res) {
      this.tabList = res;
    },
  },
});
