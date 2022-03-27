<template>
  <div class="login-warp">
    <div class="content">
      <n-card>
        <n-tabs
          :value="currentTab"
          :default-value="currentTab"
          size="large"
          :on-update:value="tabChange"
        >
          <n-tab-pane name="pwdlogin" tab="账密登录">
            <n-form
              ref="loginFormRef"
              label-placement="left"
              size="large"
              :model="loginForm"
              :rules="loginRules"
            >
              <n-form-item path="email">
                <n-input
                  v-model:value="loginForm.email"
                  placeholder="请输入邮箱"
                >
                  <template #prefix>
                    <n-icon size="20" class="lang">
                      <MailOutline></MailOutline>
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="loginForm.password"
                  type="password"
                  placeholder="请输入密码"
                  @keyup.enter="handleLoginSubmit"
                >
                  <template #prefix>
                    <n-icon size="20" class="lang">
                      <LockClosedOutline></LockClosedOutline>
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
            </n-form>
            <n-button
              type="primary"
              block
              secondary
              strong
              @click="handleLoginSubmit"
            >
              登录
            </n-button>
          </n-tab-pane>
          <n-tab-pane name="codelogin" tab="免密登录">
            <n-form
              ref="registerFormRef"
              label-placement="left"
              size="large"
              :model="registerForm"
              :rules="registerRules"
            >
              <n-form-item path="email">
                <n-input
                  v-model:value="registerForm.email"
                  placeholder="请输入邮箱"
                >
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
                    v-model:value="registerForm.code"
                    placeholder="请输入验证码"
                    @keyup.enter="handleRegisterSubmit"
                  />
                  <n-button
                    type="primary"
                    ghost
                    :disabled="downCount !== 0"
                    :loading="sendCodeLoading"
                    @click="sendCode()"
                  >
                    发送{{ downCount !== 0 ? `(${downCount})` : '' }}
                  </n-button>
                </n-input-group>
              </n-form-item>
            </n-form>
            <n-button
              type="primary"
              block
              secondary
              strong
              @click="handleRegisterSubmit"
            >
              登录
            </n-button>
          </n-tab-pane>
          <n-tab-pane name="register" tab="注册">
            <n-form
              ref="registerFormRef"
              label-placement="left"
              size="large"
              :model="registerForm"
              :rules="registerRules"
            >
              <n-form-item path="email">
                <n-input
                  v-model:value="registerForm.email"
                  placeholder="请输入邮箱"
                >
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
                    v-model:value="registerForm.code"
                    placeholder="请输入验证码"
                    @keyup.enter="handleRegisterSubmit"
                  />
                  <n-button
                    type="primary"
                    ghost
                    :disabled="downCount !== 0"
                    :loading="sendCodeLoading"
                    @click="sendCode()"
                  >
                    发送{{ downCount !== 0 ? `(${downCount})` : '' }}
                  </n-button>
                </n-input-group>
              </n-form-item>
            </n-form>
            <n-button
              type="primary"
              block
              secondary
              strong
              @click="handleRegisterSubmit"
            >
              注册
            </n-button>
          </n-tab-pane>
        </n-tabs>
      </n-card>
      <div class="other-login">
        <span>第三方登录：</span>
        <div class="logo-wrap" @click="qqLogin">
          <img class="qq-logo" src="../../assets/img/qq_logo.svg" />
        </div>
        <div class="logo-wrap" @click="githubLogin">
          <img class="qq-logo" src="../../assets/img/github_logo.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LockClosedOutline, MailOutline } from '@vicons/ionicons5';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchSendCode } from '@/api/other';
import { qqClientId, qqOauthUrl, redirectUri } from '@/constant';
import { useUserStore } from '@/store/user';

const loginRules = {
  email: { required: true, message: '请输入邮箱', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
};
const registerRules = {
  email: { required: true, message: '请输入邮箱', trigger: 'blur' },
  code: { required: true, message: '请输入验证码', trigger: 'blur' },
};
export default defineComponent({
  components: {
    MailOutline,
    LockClosedOutline,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    /** qq登录 */
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
    /** github登录 */
    const githubLogin = () => {
      return;
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
    /** 发送验证码 */
    const sendCode = async () => {
      if (registerForm.value.email === '')
        return window.$message.warning('请输入邮箱!');
      try {
        sendCodeLoading.value = true;
        // @ts-ignore
        const { message } = await fetchSendCode(registerForm.value.email);
        sendCodeLoading.value = false;
        window.$message.success(message);
        downCount.value = 60;
        const timer = setInterval(() => {
          downCount.value -= 1;
          if (downCount.value === 0) {
            clearInterval(timer);
          }
        }, 1000);
      } catch (error: any) {
        sendCodeLoading.value = false;
        window.$message.error(error.message);
      }
    };
    const loginForm = ref({
      email: '',
      password: '',
    });
    const registerForm = ref({
      email: '',
      code: '',
    });
    const loginFormRef = ref(null);
    const registerFormRef = ref(null);
    const currentTab = ref('register');
    const sendCodeLoading = ref(false);

    const handleLogin = async () => {
      const { token } = await userStore.login({
        email:
          currentTab.value === 'codelogin'
            ? registerForm.value.email
            : loginForm.value.email,
        password: currentTab.value === 'pwdlogin' && loginForm.value.password,
        code: currentTab.value === 'codelogin' && registerForm.value.code,
      });
      if (token) {
        window.$message.success('登录成功!');
        router.push('/');
      }
    };
    const handleRegister = async () => {
      const { token } = await userStore.register({
        email: registerForm.value.email,
        code: registerForm.value.code,
      });
      if (token) {
        window.$message.success('注册成功!');
        router.push('/');
        // currentTab.value = 'codelogin';
        // registerForm.value.code = '';
      }
    };
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      // @ts-ignore
      loginFormRef.value.validate(async (errors) => {
        if (!errors) {
          handleLogin();
        }
      });
    };
    const handleRegisterSubmit = (e) => {
      e.preventDefault();
      console.log(currentTab.value, 32352);
      // @ts-ignore
      registerFormRef.value.validate(async (errors) => {
        if (!errors) {
          if (currentTab.value === 'register') {
            handleRegister();
          } else {
            handleLogin();
          }
        }
      });
    };
    const downCount = ref(0);
    const tabChange = (v) => {
      console.log(v, 22);
      currentTab.value = v;
    };
    return {
      qqLogin,
      githubLogin,
      loginRules,
      registerRules,
      loginForm,
      registerForm,
      handleLoginSubmit,
      handleRegisterSubmit,
      loginFormRef,
      registerFormRef,
      sendCode,
      downCount,
      currentTab,
      tabChange,
      sendCodeLoading,
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
    position: absolute;
    min-width: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      text-align: center;
      margin: 10px 0;
    }
  }
  .other-login {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 5px 0;
    .logo-wrap {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f4f8fb;
      display: flex;
      cursor: pointer;

      .qq-logo {
        width: 25px;
        margin: 0 auto;
      }
    }
  }
}
</style>
