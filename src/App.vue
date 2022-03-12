<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// import Cookies from 'js-cookie';
export default defineComponent({
  components: {},
  setup() {
    window.addEventListener('message', async (e) => {
      const { type, data: code } = e.data;
      if (type === 'qq_login') {
        if (code) {
          console.log('收到code', code);
        }
      }
    });
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
