import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      path: null,
      routes: [],
      tabList: {},
    };
  },
  actions: {
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
