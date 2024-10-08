<template>
  <div v-if="!errMsg.length">{{ currentOauth }}登录...</div>
  <div v-else>非法登录！{{ errMsg }}</div>
</template>

<script lang="ts" setup>
import { hrefToTarget } from 'billd-utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { BLOG_CLIENT_URL } from '@/constant';
import { handleLogin } from '@/hooks/use-login';
import { clearLoginEnv, getLoginEnv } from '@/utils/cookie';

const route = useRoute();

const currentOauth = ref('非法');
const errMsg = ref('');

function handleMsg({ state, stateJson, authCode, method }) {
  try {
    const { isMobile, isAdmin, env } = stateJson;
    if (isMobile && env === 'qq') {
      // 移动端的前后台qq登录，重定向后地址栏(也就是https://admin.hsslive.cn/oauth/)只有code，没有state（应该是qq互联的问题。）额外处理
      // 因为登录前记录了登录环境信息，因此这里直接将登录信息和code都带到地址栏
      if (isAdmin) {
        handleLogin({ data: { type: 'qq_login', data: authCode } });
      } else {
        hrefToTarget(
          `${BLOG_CLIENT_URL}?code=${authCode as string}&state=${state}`
        );
      }

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
          `${BLOG_CLIENT_URL}?code=${authCode as string}&state=${state}`
        );
      }
    } else {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: method,
            data: authCode,
          },
          '*'
        );
        window.close();
      } else {
        console.error(`no window.opener method ${authCode as string}`);
        alert(`no window.opener method ${authCode as string}`);
      }
    }
  } catch (error) {
    console.log(error);
    clearLoginEnv();
  }
}

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

  let stateJson;
  try {
    stateJson = JSON.parse(state as string);
    console.log('解密state');
    console.log(stateJson);
  } catch (error) {
    console.error('解密state错误', state);
    console.error(error);
  }
  if (!stateJson) return;

  if (stateJson.isDev) {
    handleMsg({ state, stateJson, authCode, method });
    return;
  }

  // 在第三方登录的时候，都会往cookie里记录环境，因此这里直接读取
  const loginEnv = getLoginEnv();
  console.log('getLoginEnv', loginEnv);
  if (!loginEnv) {
    console.error('getLoginEnv为空');
    return;
  }
  if (state !== window.decodeURIComponent(loginEnv)) {
    console.error('非法回调');
    console.log(state);
    console.log(loginEnv);
    console.log(window.decodeURIComponent(loginEnv));
    return;
  }
  handleMsg({ state, stateJson, authCode, method });
});
</script>

<style lang="scss" scoped></style>
