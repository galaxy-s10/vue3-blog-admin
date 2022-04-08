import { defineStore } from 'pinia';

import cache from '@/utils/cache';
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      loading: false,
      env: 'prod',
      path: null,
      routes: [],
      tabList: {},
    };
  },
  actions: {
    setLoading(res) {
      this.loading = res;
    },
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
