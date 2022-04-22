<template>
  <div class="login-warp">
    <div class="content">
      <img
        v-if="!focus"
        class="top"
        src="@/assets/img/juejin-open-eye.svg"
        alt=""
      />
      <img
        v-else
        class="top close"
        src="@/assets/img/juejin-close-eye.svg"
        alt=""
      />
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
              <n-form-item path="id">
                <n-input
                  v-model:value="loginForm.id"
                  type="number"
                  placeholder="请输入账号"
                >
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
                  @focus="onFocus"
                  @blur="onBlur"
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
import {
  LockClosedOutline,
  MailOutline,
  PersonOutline,
} from '@vicons/ionicons5';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchSendLoginCode, fetchSendRegisterCode } from '@/api/emailUser';
import {
  GITHUB_CLIENT_ID,
  GITHUB_OAUTH_URL,
  QQ_CLIENT_ID,
  QQ_OAUTH_URL,
  REDIRECT_URI,
} from '@/constant';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';

const loginRules = {
  id: { required: true, message: '请输入账号', trigger: 'blur' },
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
    PersonOutline,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const appStore = useAppStore();

    /** qq登录 */
    const qqLogin = () => {
      const url =
        `${QQ_OAUTH_URL}client_id=${QQ_CLIENT_ID}&redirect_uri=${REDIRECT_URI}qq_login` +
        `&state=99&scope=get_user_info,get_vip_info,get_vip_rich_info`;
      window.open(
        url,
        // 'http://localhost:8000/oauth/qq_login?code=8CDE3D8B50934C88F1949D6F1FCF7C6F&state=99',
        'qq_login_window',
        'toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=no,titlebar=no,toolbar=no,resizable=no,copyhistory=yes, width=918, height=609,top=250,left=400'
      );
      appStore.setLoading(true);
    };
    /** github登录 */
    const githubLogin = () => {
      const url =
        GITHUB_OAUTH_URL +
        'client_id=' +
        GITHUB_CLIENT_ID +
        '&redirect_uri=' +
        REDIRECT_URI +
        'github_login' +
        '&scope=user';
      window.open(
        url,
        'github_login_window',
        'toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=no,titlebar=no,toolbar=no,resizable=no,copyhistory=yes, width=918, height=609,top=250,left=400'
      );
      appStore.setLoading(true);
    };

    const loginForm = ref({
      id: '',
      password: '',
    });
    const registerForm = ref({
      email: '',
      code: '',
    });
    const loginFormRef = ref(null);
    const registerFormRef = ref(null);
    const currentTab = ref('pwdlogin');
    const sendCodeLoading = ref(false);
    const downCount = ref(0);

    const handleLogin = async () => {
      let token = null;
      if (currentTab.value === 'codelogin') {
        token = await userStore.codeLogin({
          email: registerForm.value.email,
          code: registerForm.value.code,
        });
      } else {
        token = await userStore.pwdLogin({
          id: +loginForm.value.id,
          password: loginForm.value.password,
        });
      }
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
    /** 发送验证码 */
    const sendCode = async () => {
      if (registerForm.value.email === '')
        return window.$message.warning('请输入邮箱!');
      try {
        sendCodeLoading.value = true;
        if (currentTab.value === 'codelogin') {
          await fetchSendLoginCode(registerForm.value.email);
        } else {
          await fetchSendRegisterCode(registerForm.value.email);
        }
        sendCodeLoading.value = false;
        window.$message.success('发送成功!');
        downCount.value = 60;
        const timer = setInterval(() => {
          downCount.value -= 1;
          if (downCount.value === 0) {
            clearInterval(timer);
          }
        }, 1000);
      } catch (error: any) {
        sendCodeLoading.value = false;
        console.log(error);
      }
    };
    const tabChange = (v) => {
      currentTab.value = v;
    };
    const focus = ref(false);
    const onFocus = () => {
      focus.value = true;
    };
    const onBlur = () => {
      focus.value = false;
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
      onFocus,
      onBlur,
      focus,
    };
  },
});
</script>

<style lang="scss">
.login-warp {
  position: relative;
  min-height: 100vh;
  background-color: #f5f7f9;
  .content {
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    min-width: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .top {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -90%);
      z-index: 100;
      width: 120px;
      &.close {
        transform: translate(-50%, -99%);
        z-index: 0;
      }
    }

    .title {
      text-align: center;
      margin: 10px 0;
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
}
</style>
