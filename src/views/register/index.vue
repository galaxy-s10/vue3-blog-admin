<template>
  <div class="login-warp">
    <div class="content">
      <h2 class="title">后台注册</h2>
      <n-form
        ref="formRef"
        label-placement="left"
        size="large"
        :model="loginForm"
        :rules="rules"
      >
        <n-form-item path="email">
          <n-input v-model:value="loginForm.email" placeholder="请输入邮箱">
            <template #prefix>
              <n-icon size="20" class="lang">
                <MailOutline></MailOutline>
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="code">
          <n-input-group>
            <n-input
              v-model:value="loginForm.code"
              placeholder="请输入验证码"
              @keyup.enter="handleSubmit"
            />
            <n-button type="primary" ghost @click="sendCode()">
              发送{{ downCount !== 0 ? `(${downCount})` : '' }}
            </n-button>
          </n-input-group>
          <!-- <n-input
            v-model:value="loginForm.code"
            type="code"
            placeholder="请输入验证码"
            @keyup.enter="handleSubmit"
          >
            <template #prefix>
              <n-icon size="20" class="lang">
                <LockClosedOutline></LockClosedOutline>
              </n-icon>
            </template>
          </n-input> -->
        </n-form-item>
      </n-form>
      <n-button type="info" block @click="handleSubmit">注册</n-button>
      <div class="other-login">
        <span>第三方登录：</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MailOutline } from '@vicons/ionicons5';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchSendCode } from '@/api/email';
import { fetchLogin, fetchQQLogin } from '@/api/user';
import { qqClientId, qqOauthUrl, redirectUri } from '@/constant';
import { useUserStore } from '@/store/user';
import cache from '@/utils/cache';

const rules = {
  email: { required: true, message: '请输入邮箱', trigger: 'blur' },
  code: { required: true, message: '请输入验证码', trigger: 'blur' },
};
export default defineComponent({
  components: {
    MailOutline,
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
      email: '',
      code: '',
    });
    const downCount = ref(0);
    const formRef = ref(null);
    const handleLogin = async () => {
      const { token } = await userStore.login({
        email: Number(loginForm.value.email),
        code: loginForm.value.code,
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
    const sendCode = () => {
      if (loginForm.value.email === '')
        return window.$message.warning('请输入邮箱!');
      fetchSendCode(loginForm.value.email).then(() => {
        downCount.value = 60;
        const timer = setInterval(() => {
          downCount.value -= 1;
          if (downCount.value === 0) {
            clearInterval(timer);
          }
        }, 1000);
      });
    };

    return {
      qqLogin,
      rules,
      loginForm,
      handleSubmit,
      formRef,
      downCount,
      sendCode,
    };
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
