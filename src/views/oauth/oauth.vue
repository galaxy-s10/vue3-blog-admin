<template>
  <div>{{ currentOauth }}登录{{ currentOauth === '非法' ? '' : '...' }}</div>
</template>

<script lang="ts" setup>
import { hrefToTarget } from 'billd-utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { BLOG_CLIENT_URL } from '@/constant';

const route = useRoute();
const { method } = route.params;
const { code: authCode, state } = route.query;
const envList = ['qqMobile', 'qqPc', 'githubMobile', 'githubPc'];
const currentOauth = ref('非法');

if (typeof state === 'string') {
  // 解密state
  const origin = window.atob(state);
  try {
    // 判断state是否合法
    const data = JSON.parse(origin);
    const { code, env } = data;
    if (
      Object.keys(data).length !== 2 ||
      code !== 200 ||
      !envList.includes(env)
    ) {
      console.error('解密state成功，但非法');
      return;
    }
    switch (method) {
      case 'qq_login':
        currentOauth.value = 'QQ';
        break;
      case 'github_login':
        currentOauth.value = 'Github';
        break;
    }
    if (['qqMobile', 'githubMobile'].includes(env)) {
      hrefToTarget(
        `${BLOG_CLIENT_URL}?code=${authCode as string}&env=${env as string}`
      );
    } else if (['qqPc', 'githubPc'].includes(env)) {
      if (
        window.opener &&
        ['qq_login', 'github_login'].includes(method as string)
      ) {
        window.opener.postMessage(
          {
            type: method,
            data: code,
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
</script>

<style lang="scss" scoped></style>
