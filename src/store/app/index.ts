import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      version: 1,
      routes: null,
      path: null,
    };
  },
  actions: {
    increment() {
      this.version += 1;
    },
    setRoutes(v) {
      this.routes = v;
    },
  },
});
