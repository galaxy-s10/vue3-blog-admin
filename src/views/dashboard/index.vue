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
    <div @click="aaa">2222</div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

import { useUserStore } from '@/store/user';

export default defineComponent({
  components: {},
  setup() {
    const userStore = useUserStore();
    const { userInfo } = userStore;
    const aaa = () => {
      console.log('aaa');
      axios
        .get('https://lsyboy.cn/music/api/getRecommend', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            Referer: '1423525',
          },
        })
        .then((res) => {
          console.log(res, 444);
        });
    };
    return { userInfo, aaa };
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
