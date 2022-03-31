<template>
  <div>{{ currentOauth }}登录{{ currentOauth === '非法' ? '' : '...' }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute();

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
    console.log(method, code, window.opener, 22222);
    if (window.opener && ['qq_login', 'github_login'].includes(method)) {
      window.opener.postMessage(
        {
          type: method,
          data: code,
        },
        '*'
      );
      // setTimeout(() => {
      // window.close();
      // }, 1000);
    }

    return {
      currentOauth,
    };
  },
});
</script>

<style lang="scss" scoped></style>
