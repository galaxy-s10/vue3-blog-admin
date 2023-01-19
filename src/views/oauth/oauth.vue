<template>
  <div>{{ currentOauth }}登录{{ currentOauth === '非法' ? '' : '...' }}</div>
</template>

<script lang="ts" setup>
import { hrefToTarget, isMobile } from 'billd-utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { BLOG_CLIENT_URL } from '@/constant';
import { getLoginEnv, clearLoginEnv } from '@/utils/cookie';

const route = useRoute();

const loginEnvList = ['qqMobile', 'qqPc', 'githubMobile', 'githubPc'];
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
  const loginEnv = getLoginEnv();
  // 如果是移动端的qq登录，重定向后拿不到state，额外处理（判断缓存）
  if (isMobile() && loginEnv === 'qqMobile') {
    clearLoginEnv();
    hrefToTarget(
      `${BLOG_CLIENT_URL}?code=${authCode as string}&loginEnv=${
        loginEnv as string
      }`
    );
  } else if (typeof state === 'string') {
    // 否则的话都要校验state
    try {
      // 解密state
      const origin = window.atob(state);
      // 判断state是否合法
      const data = JSON.parse(origin);
      const { code, loginEnv } = data;
      if (
        Object.keys(data).length !== 2 ||
        code !== 200 ||
        !loginEnvList.includes(loginEnv)
      ) {
        console.error('解密state成功，但非法');
        return;
      }
      if (['qqMobile', 'githubMobile'].includes(loginEnv)) {
        hrefToTarget(
          `${BLOG_CLIENT_URL}?code=${authCode as string}&loginEnv=${
            loginEnv as string
          }`
        );
      } else if (['qqPc', 'githubPc'].includes(loginEnv)) {
        if (
          window.opener &&
          ['qq_login', 'github_login'].includes(method as string)
        ) {
          window.opener.postMessage(
            {
              type: method,
              data: authCode,
            },
            '*'
          );
          window.close();
        }
      }
    } catch (error) {
      console.error('解密state失败');
      console.error(error);
    }
  }
});
</script>

<style lang="scss" scoped></style>
