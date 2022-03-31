<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Cookies from 'js-cookie';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { fetchGithubLogin, fetchBindGithub } from '@/api/githubUser';
import { fetchQQLogin, fetchBindQQ } from '@/api/qqUser';
import { useUserStore } from '@/store/user/index';
// import { useUserStore } from '@/store/user';

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    // if (process.env.NODE_ENV !== 'development') {
    window.addEventListener('message', async (e) => {
      console.log('收到消息', e.data);
      const { type, data: code } = e.data;
      let token = null;
      if (!code) return;
      try {
        switch (type) {
          case 'qq_login':
            if (userStore.userInfo) {
              await fetchBindQQ(code);
              userStore.getUserInfo();
            } else {
              await fetchQQLogin(code);
            }
            break;
          case 'github_login':
            if (userStore.userInfo) {
              await fetchBindGithub(code);
              userStore.getUserInfo();
            } else {
              await fetchGithubLogin(code);
            }
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
      if (token) {
        userStore.setToken(token);
        router.push('/');
      }
    });
    // }
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
