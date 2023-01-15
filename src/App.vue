<template>
  <n-spin :show="appLoading">
    <div class="app-wrap">
      <router-view></router-view>
    </div>
    <SwitchEnvCpt></SwitchEnvCpt>
  </n-spin>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';

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
    const route = useRoute();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const appLoading = toRef(appStore, 'loading');

    window.addEventListener('message', async (e) => {
      const { type, data: code } = e.data;
      if (!POSTMESSAGE_TYPE.includes(type)) return;
      console.log('收到消息', type, code);
      if (type === 'login_expired') {
        window.$message.error('登录错误，请重试~');
        return;
      }
      try {
        let token = '';
        switch (type) {
          case 'qq_login':
            if (userStore.userInfo) {
              const res: any = await fetchBindQQ(code);
              window.$message.success(res.message);
              userStore.getUserInfo();
            } else {
              const { data } = await fetchQQLogin(code);
              token = data;
            }
            break;
          case 'github_login':
            if (userStore.userInfo) {
              const res: any = await fetchBindGithub(code);
              window.$message.success(res.message);
              userStore.getUserInfo();
            } else {
              const { data } = await fetchGithubLogin(code);
              token = data;
            }
            break;
        }
        userStore.setToken(token);
        router.push((route.query.redirect as '') || '/');
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
