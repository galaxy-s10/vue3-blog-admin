import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      path: null,
      routes: null,
      tagbarList: {},
    };
  },
  actions: {
    setPath(res) {
      this.path = res;
    },
    setRoutes(res) {
      this.routes = res;
    },
    setTagbarList(res) {
      this.tagbarList = res;
    },
  },
});
