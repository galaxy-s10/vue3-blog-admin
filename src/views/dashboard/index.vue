<template>
  <div class="dashboard-wrap">
    <div>账号id: {{ userInfo.id }}</div>
    <div>用户名: {{ userInfo.username }}</div>
    <div>
      用户头像:
      <img class="avatar" :src="userInfo.avatar" alt="" />
    </div>
    <div>title: {{ userInfo.title }}</div>
    <div>roles: {{ userInfo.roles.map((v) => v.role_description) }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useUserStore } from '@/store/user';

export default defineComponent({
  components: {},
  setup() {
    const userStore = useUserStore();
    const { userInfo } = userStore;
    return { userInfo };
  },
});
</script>

<style lang="scss" scoped>
.dashboard-wrap {
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
