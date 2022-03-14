<template>
  <div>{{ currentOauth }}登录{{ currentOauth !== '非法' && '成功！' }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { fetchLogin, fetchQQLogin } from '@/api/user';
import { useUserStore } from '@/store/user';

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();

    const { method }: any = route.params;
    const { code } = route.query;
    let currentOauth = '';
    switch (method) {
      case 'qq_login':
        currentOauth = 'QQ';
        break;
      case 'github_login':
        currentOauth = 'Github';
        break;
      default:
        currentOauth = '非法';
    }
    if (window.opener && ['qq_login', 'github_login'].includes(method)) {
      window.opener.postMessage(
        {
          type: method === 'QQ' ? 'qq_login' : 'github_login',
          data: code,
        },
        '*'
      );
      window.close();
    }
    window.addEventListener('message', async (e) => {
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
    });
    return {
      currentOauth,
    };
  },
});
</script>

<style lang="scss" scoped></style>
