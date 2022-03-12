import { defineStore } from 'pinia';
import { fetchUserInfo } from '@/api/user';

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
      this.token = res;
    },
    setRoles(res) {
      this.roles = res;
    },
    async getUserInfo() {
      try {
        const { data } = await fetchUserInfo();
        this.setRoles(data.roles);
        return data.roles;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
});
