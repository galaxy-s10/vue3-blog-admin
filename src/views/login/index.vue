<template>
  <div class="login-warp">
    <div class="content">
      <h2 class="title">后台登录</h2>
      <img
        class="qq-logo"
        src="../../assets/img/Connect_logo_5.png"
        alt=""
        @click="qqLogin"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const qqLogin = () => {
      window.location.href =
        'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101934585&redirect_uri=https://admin.hsslive.cn/oauth/qq_login&state=99&scope=get_user_info,get_vip_info,get_vip_rich_info';
      // window.location.href =
      //   'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101999560&redirect_uri=https://admin.hsslive.cn/oauth/qq_login&state=99&scope=get_user_info,get_vip_info,get_vip_rich_info';
    };

    return { qqLogin };
  },
});
</script>

<style lang="scss">
.login-warp {
  position: relative;
  min-height: 100vh;
  background-color: #293146;
  .content {
    background-color: #fff;
    border-radius: 5px;
    width: 300px;
    position: absolute;
    padding: 10px 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      text-align: center;
      margin: 0;
    }
    .qq-logo {
      display: block;
      /* height: 100px; */
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>
