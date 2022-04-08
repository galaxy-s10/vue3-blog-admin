<template>
  <n-spin :show="show">
    <router-view></router-view>
    <SwitchEnvCpt></SwitchEnvCpt>
  </n-spin>
</template>

<script lang="ts">
import Cookies from 'js-cookie';
import { defineComponent, toRef } from 'vue';
import { useRouter } from 'vue-router';

import { fetchGithubLogin, fetchBindGithub } from '@/api/githubUser';
import { fetchQQLogin, fetchBindQQ } from '@/api/qqUser';
import SwitchEnvCpt from '@/components/SwitchEnv/index.vue';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';

export default defineComponent({
  components: { SwitchEnvCpt },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const appStore = useAppStore();

    const show = toRef(appStore, 'loading');

    window.addEventListener('message', async (e) => {
      const { type, data: code } = e.data;
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
        userStore.setToken(Cookies.get('token'));
        router.push('/');
      } catch (error) {
        console.log(error);
      } finally {
        appStore.setLoading(false);
      }
    });

    return { show };
  },
});
</script>

<style lang="scss" scoped></style>
