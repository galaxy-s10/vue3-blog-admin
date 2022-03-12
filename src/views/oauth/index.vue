<template>
  <div>
    {{ currentOauth }}登录{{ currentOauth !== '非法' ? '成功！' : '！' }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute();
    const { method } = route.params;
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
    return {
      currentOauth,
    };
  },
});
</script>

<style lang="scss" scoped></style>
