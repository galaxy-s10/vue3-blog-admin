<template>
  <div class="login-warp">
    <div class="content">
      <h2 class="title">后台登录</h2>
      <n-form
        ref="formRef"
        label-placement="left"
        size="large"
        :model="loginForm"
        :rules="rules"
      >
        <n-form-item path="account">
          <n-input v-model:value="loginForm.account" placeholder="请输入账号">
            <template #prefix>
              <n-icon size="20" class="lang">
                <PersonOutline></PersonOutline>
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="loginForm.password"
            type="password"
            placeholder="请输入密码"
            @keyup.enter="handleSubmit"
          >
            <template #prefix>
              <n-icon size="20" class="lang">
                <LockClosedOutline></LockClosedOutline>
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
      </n-form>
      <n-button type="info" block @click="handleSubmit">登录</n-button>
      <div class="other-login">
        <span>合作账号登录：</span>
        <img
          class="qq-logo"
          src="../../assets/img/qq_login_logo.png"
          @click="qqLogin"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LockClosedOutline, PersonOutline } from '@vicons/ionicons5';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchLogin, fetchQQLogin } from '@/api/user';
import { qqClientId, qqOauthUrl, redirectUri } from '@/constant';
import { useUserStore } from '@/store/user';
import cache from '@/utils/cache';

const rules = {
  account: { required: true, message: '请输入账号', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
};
export default defineComponent({
  components: {
    PersonOutline,
    LockClosedOutline,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const qqLogin = () => {
      const url =
        `${qqOauthUrl}client_id=${qqClientId}&redirect_uri=${redirectUri}qq_login` +
        `&state=99&scope=get_user_info,get_vip_info,get_vip_rich_info`;
      window.open(
        url,
        // 'http://localhost:8000/oauth/qq_login?code=8CDE3D8B50934C88F1949D6F1FCF7C6F&state=99',
        'qq_login_window',
        'toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=no,titlebar=no,toolbar=no,resizable=no,copyhistory=yes, width=918, height=609,top=250,left=400'
      );
    };
    const loginForm = ref({
      account: '',
      password: '',
    });
    const formRef = ref(null);
    const handleLogin = async () => {
      const { token } = await userStore.login({
        account: Number(loginForm.value.account),
        password: loginForm.value.password,
      });
      if (token) {
        window.$message.success('登录成功!');
        router.push('/');
      }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      formRef.value.validate(async (errors) => {
        if (!errors) {
          handleLogin();
        }
      });
    };

    return { qqLogin, rules, loginForm, handleSubmit, formRef };
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
      margin: 10px 0;
    }
    .other-login {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .qq-logo {
        cursor: pointer;
      }
    }
  }
}
</style>
