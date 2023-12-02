<template>
  <div>{{ currentOauth }}登录{{ currentOauth === '非法' ? '' : '...' }}</div>
</template>

<script lang="ts" setup>
import { hrefToTarget } from 'billd-utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { BLOG_ADMIN_URL, BLOG_CLIENT_URL } from '@/constant';
import { handleLogin } from '@/hooks/use-login';
import { clearLoginEnv, getLoginEnv } from '@/utils/cookie';

const route = useRoute();

const currentOauth = ref('非法');

onMounted(() => {
  const { method } = route.params;
  const { code: authCode, state } = route.query;
  switch (method) {
    case 'qq_login':
      currentOauth.value = 'QQ';
      break;
    case 'github_login':
      currentOauth.value = 'Github';
      break;
  }

  // 在第三方登录的时候，都会往cookie里记录环境，因此这里直接读取
  const loginEnv = getLoginEnv();
  if (!loginEnv) return;
  try {
    const { isMobile, isAdmin, env } = JSON.parse(loginEnv);
    if (isMobile && env === 'qq') {
      // 移动端的前后台qq登录，重定向后地址栏(也就是https://admin.hsslive.cn/oauth/)只有code，没有state（应该是qq互联的问题。）额外处理
      // 因为登录前记录了登录环境信息，因此这里直接将登录信息和code都带到地址栏
      if (isAdmin) {
        handleLogin({ data: { type: 'qq_login', data: authCode } });
      } else {
        hrefToTarget(
          `${isAdmin ? BLOG_ADMIN_URL : BLOG_CLIENT_URL}?code=${
            authCode as string
          }&loginEnv=${loginEnv as string}`
        );
      }

      return;
    }

    if (state !== window.btoa(window.decodeURIComponent(loginEnv))) {
      console.error('非法回调');
      return;
    }

    if (isMobile) {
      if (isAdmin) {
        if (env === 'qq') {
          handleLogin({ data: { type: 'qq_login', data: authCode } });
        } else if (env === 'github') {
          handleLogin({ data: { type: 'github_login', data: authCode } });
        }
      } else {
        hrefToTarget(
          `${BLOG_CLIENT_URL}?code=${authCode as string}&loginEnv=${
            loginEnv as string
          }`
        );
      }
    } else {
      window.opener.postMessage(
        {
          type: method,
          data: authCode,
        },
        '*'
      );
      window.close();
    }
  } catch (error) {
    console.log(error);
    clearLoginEnv();
  }
});
</script>

<style lang="scss" scoped></style>
