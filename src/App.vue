<template>
  <n-spin :show="appLoading">
    <div class="app-wrap">
      <router-view></router-view>
    </div>
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
import { POSTMESSAGE_TYPE } from '@/constant';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
export default defineComponent({
  components: { SwitchEnvCpt },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const appStore = useAppStore();

    const appLoading = toRef(appStore, 'loading');

    window.addEventListener('message', async (e) => {
      const { type, data: code } = e.data;
      // console.log('收到消息', type, code);
      if (!POSTMESSAGE_TYPE.includes(type)) return;
      if (type === 'login_expired') {
        window.$message.error('登录错误，请重试~');
        return;
      }
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
        }
        userStore.setToken(Cookies.get('token'));
        router.push('/');
      } catch (error) {
        console.log(error);
      } finally {
        appStore.setLoading(false);
      }
    });

    return { appLoading };
  },
});
</script>

<style lang="scss" scoped>
.app-wrap {
  min-height: 100vh;
}
</style>
