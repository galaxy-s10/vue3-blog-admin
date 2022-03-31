<template>
  <div class="account-wrap">
    <div class="list">
      <div class="item">
        <div class="label">邮箱</div>
        <div class="content">
          {{
            userInfo.email_users[0] ? userInfo.email_users[0].email : '未绑定'
          }}
        </div>
        <n-button text type="info" @click="handleBindEmail()">
          {{ userInfo.email_users[0] ? '解绑' : '绑定' }}
        </n-button>
      </div>
      <div class="item">
        <div class="label">Github</div>
        <div class="content">
          {{
            userInfo.github_users[0] ? userInfo.github_users[0].name : '未绑定'
          }}
        </div>
        <n-button text type="info" @click="handleBindThird('github')">
          {{ userInfo.github_users[0] ? '解绑' : '绑定' }}
        </n-button>
      </div>
      <div class="item">
        <div class="label">QQ</div>
        <div class="content">
          {{ userInfo.qq_users[0] ? userInfo.qq_users[0].nickname : '未绑定' }}
        </div>
        <n-button text type="info" @click="handleBindThird('qq')">
          {{ userInfo.qq_users[0] ? '解绑' : '绑定' }}
        </n-button>
      </div>
      <div class="item">
        <div class="label">密码</div>
        <div class="content"></div>
        <n-button text type="info">重置</n-button>
      </div>
    </div>

    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :title="userInfo.email_users[0] ? '解绑邮箱' : '绑定邮箱'"
      positive-text="确认"
      negative-text="取消"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
    >
      <n-form
        ref="bindEmailFormRef"
        label-placement="left"
        size="large"
        :model="bindEmailForm"
        :rules="bindEmailRules"
      >
        <n-form-item path="email">
          <n-input
            v-model:value="bindEmailForm.email"
            placeholder="请输入邮箱"
            :disabled="userInfo.email_users[0]"
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
              v-model:value="bindEmailForm.code"
              placeholder="请输入验证码"
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
    </n-modal>
    <div @click="aa">aa</div>
  </div>
</template>

<script lang="ts">
import { MailOutline } from '@vicons/ionicons5';
import { defineComponent, ref, toRef, watch } from 'vue';

import {
  fetchBindEmail,
  fetchSendBindEmailCode,
  fetchCancelBindEmail,
  fetchCancelSendBindEmailCode,
} from '@/api/emailUser';
import { fetchCancelBindGithub, fetchBindGithub } from '@/api/githubUser';
import { fetchCancelBindQQ, fetchBindQQ } from '@/api/qqUser';
import {
  GITHUB_CLIENT_ID,
  GITHUB_OAUTH_URL,
  QQ_CLIENT_ID,
  QQ_OAUTH_URL,
  REDIRECT_URI,
} from '@/constant';
import { useUserStore } from '@/store/user';
const bindEmailRules = {
  email: { required: true, message: '请输入邮箱', trigger: 'blur' },
  code: { required: true, message: '请输入验证码', trigger: 'blur' },
};
export default defineComponent({
  components: { MailOutline },
  setup() {
    const userStore = useUserStore();
    // const { userInfo } = userStore;
    const userInfo = toRef(userStore, 'userInfo');
    const sendCodeLoading = ref(false);
    const showModal = ref(false);
    const downCount = ref(0);
    const bindEmailFormRef = ref(null);
    /** 发送验证码 */
    const sendCode = async () => {
      if (bindEmailForm.value.email === '')
        return window.$message.warning('请输入邮箱!');
      try {
        sendCodeLoading.value = true;
        let message = '';
        if (userInfo.value.email_users[0]) {
          const res = await fetchCancelSendBindEmailCode(
            bindEmailForm.value.email
          );
          message = res.message;
        } else {
          const res = await fetchSendBindEmailCode(bindEmailForm.value.email);
          message = res.message;
        }
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
    const bindEmailForm = ref({
      email: '',
      code: '',
    });

    /**
     * platform: github, qq
     */
    const handleBindThird = async (platform) => {
      const devUrl =
        'http://localhost:8000/oauth/qq_login?code=8CDE3D8B50934C88F1949D6F1FCF7C6F';
      if (platform === 'qq') {
        if (userInfo.value.qq_users[0]) {
          console.log('解绑qq');
          await fetchCancelBindQQ();
        } else {
          const bind_qq_url =
            `${QQ_OAUTH_URL}client_id=${QQ_CLIENT_ID}&redirect_uri=${REDIRECT_URI}qq_login` +
            `&state=99&scope=get_user_info,get_vip_info,get_vip_rich_info`;
          window.open(
            bind_qq_url,
            'qq_login_window',
            'toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=no,titlebar=no,toolbar=no,resizable=no,copyhistory=yes, width=918, height=609,top=250,left=400'
          );
        }
      } else {
        if (userInfo.value.github_users[0]) {
          console.log('解绑github');
          await fetchCancelBindGithub();
        } else {
          const bind_github_url =
            GITHUB_OAUTH_URL +
            'client_id=' +
            GITHUB_CLIENT_ID +
            '&redirect_uri=' +
            REDIRECT_URI +
            'github_login' +
            '&scope=user';
          window.open(
            bind_github_url,
            'github_login_window',
            'toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=no,titlebar=no,toolbar=no,resizable=no,copyhistory=yes, width=918, height=609,top=250,left=400'
          );
        }
      }
      userStore.getUserInfo();
    };

    watch(userStore, (a, b) => {
      console.log(a, b, 9888);
    });

    const ajaxBindEmailForm = async () => {
      const res = await fetchBindEmail(bindEmailForm.value);
      window.$message.success(res.message);
      // showModal.value = false;
      bindEmailForm.value = {
        email: '',
        code: '',
      };
    };

    const ajaxCancelBindEmailForm = async () => {
      const res = await fetchCancelBindEmail(bindEmailForm.value.code);
      window.$message.success(res.message);
      // showModal.value = false;
      bindEmailForm.value = {
        email: '',
        code: '',
      };
    };

    const aa = () => {
      userStore.getUserInfo();
    };

    const submitCallback = () => {
      return new Promise((res, rej) => {
        // @ts-ignore
        bindEmailFormRef.value.validate(async (errors) => {
          if (!errors) {
            try {
              if (userStore.userInfo.email_users[0]) {
                await ajaxCancelBindEmailForm();
              } else {
                await ajaxBindEmailForm();
              }
              await userStore.getUserInfo();
              res(1);
            } catch (error) {
              console.log(error);
              rej();
            }
          } else {
            rej();
          }
        });
      });
    };
    const handleBindEmail = () => {
      if (userInfo.value.email_users[0]) {
        bindEmailForm.value.email = userInfo.value.email_users[0].email;
      }
      showModal.value = true;
    };
    const cancelCallback = () => {};
    return {
      userInfo,
      sendCode,
      bindEmailRules,
      bindEmailForm,
      bindEmailFormRef,
      showModal,
      downCount,
      cancelCallback,
      submitCallback,
      handleBindEmail,
      aa,
      handleBindThird,
    };
  },
});
</script>

<style lang="scss" scoped>
.account-wrap {
  .list {
    .item {
      display: flex;
      align-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f1f1f1;
      padding: 10px 0;
      .label {
        width: 50px;
        margin: 10px;
      }
      .content {
        flex: 1;
      }
    }
  }
}
</style>
