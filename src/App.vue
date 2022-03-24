<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Cookies from 'js-cookie';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { APP_ENV } from '../config/utils/outputStaticUrl';

import { fetchCsrf } from '@/api/csrf';
import { fetchLogin, fetchQQLogin } from '@/api/user';
import { useUserStore } from '@/store/user/index';
// import { useUserStore } from '@/store/user';

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    fetchCsrf();
    if (process.env.NODE_ENV !== 'development') {
      window.addEventListener('message', async (e) => {
        const { type, data: code } = e.data;
        console.log('收到消息', type, code);
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
    }
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
