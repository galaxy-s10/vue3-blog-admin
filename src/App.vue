<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Cookies from 'js-cookie';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { fetchGithubLogin } from '@/api/githubUser';
import { fetchQQLogin } from '@/api/qqUser';
import { useUserStore } from '@/store/user/index';
// import { useUserStore } from '@/store/user';

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    if (process.env.NODE_ENV !== 'development') {
      window.addEventListener('message', async (e) => {
        console.log('收到消息', e.data);
        const { type, data: code } = e.data;
        if (type === 'qq_login') {
          if (code) {
            try {
              await fetchQQLogin(code);
              const token = Cookies.get('token');
              if (token) {
                userStore.setToken(token);
                router.push('/');
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
        if (type === 'github_login') {
          if (code) {
            try {
              await fetchGithubLogin(code);
              const token = Cookies.get('token');
              if (token) {
                userStore.setToken(token);
                router.push('/');
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      });
    }
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
