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
        <n-button
          text
          type="info"
          @click="handlePositiveClick"
        >
          {{ userInfo.email_users[0] ? '解绑' : '绑定' }}
        </n-button>
      </div>
      <div class="item">
        <div class="label">Github</div>
        <div class="content">
          {{
            userInfo.github_users[0] ? userInfo.github_users[0].login : '未绑定'
          }}
        </div>
        <n-popconfirm
          negative-text="取消"
          positive-text="确定"
          @positive-click="handleBindThird('github')"
          @negative-click="handleNegativeClick"
        >
          <template #trigger>
            <n-button
              text
              type="info"
            >
              {{ userInfo.github_users[0] ? '解绑' : '绑定' }}
            </n-button>
          </template>
          确定{{ userInfo.github_users[0] ? '解绑' : '绑定' }}github？
        </n-popconfirm>
      </div>
      <div class="item">
        <div class="label">QQ</div>
        <div class="content">
          {{ userInfo.qq_users[0] ? userInfo.qq_users[0].nickname : '未绑定' }}
        </div>
        <n-popconfirm
          negative-text="取消"
          positive-text="确定"
          @positive-click="handleBindThird('qq')"
          @negative-click="handleNegativeClick"
        >
          <template #trigger>
            <n-button
              text
              type="info"
            >
              {{ userInfo.qq_users[0] ? '解绑' : '绑定' }}
            </n-button>
          </template>
          确定{{ userInfo.qq_users[0] ? '解绑' : '绑定' }}qq？
        </n-popconfirm>
      </div>
      <div class="item">
        <div class="label">密码</div>
        <div class="content">
          <n-button
            text
            type="info"
            @click="getPwd()"
            >点击获取</n-button
          >
          {{ password }}
        </div>
        <n-button
          text
          type="info"
          @click="resetPwd"
          >重置</n-button
        >
      </div>
    </div>

    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :title="userInfo.email_users[0] ? '解绑邮箱' : '绑定邮箱'"
      positive-text="确认"
      negative-text="取消"
      @positive-click="submitCallback"
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
            :disabled="!!userInfo.email_users[0]"
          >
            <template #prefix>
              <n-icon
                size="20"
                class="lang"
              >
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
              :loading="loading"
              @click="sendBindEmailCode()"
            >
              发送{{ downCount !== 0 ? `(${downCount})` : '' }}
            </n-button>
          </n-input-group>
        </n-form-item>
      </n-form>
    </n-modal>
    <component
      :is="currCpt"
      v-if="currCpt !== ''"
      @negative-click="negativeClick"
    ></component>
  </div>
</template>

<script lang="ts" setup>
import { MailOutline } from '@vicons/ionicons5';
import { ref, toRef } from 'vue';

import {
  fetchBindEmail,
  fetchCancelBindEmail,
  fetchCancelSendBindEmailCode,
  fetchSendBindEmailCode,
} from '@/api/emailUser';
import { fetchCancelBindGithub } from '@/api/githubUser';
import { fetchCancelBindQQ } from '@/api/qqUser';
import { fetchUserPwd } from '@/api/user';
import { useGithubLogin, useQQLogin } from '@/hooks/use-login';
import { useUserStore } from '@/store/user';

const bindEmailRules = {
  email: { required: true, message: '请输入邮箱', trigger: 'blur' },
  code: { required: true, message: '请输入验证码', trigger: 'blur' },
};
const userStore = useUserStore();
const userInfo: any = toRef(userStore, 'userInfo');
const password = ref('');
const currCpt = ref('');
const loading = ref(false);
const showModal = ref(false);
const downCount = ref(0);
const bindEmailFormRef = ref(null);
const bindEmailForm = ref({
  email: '',
  code: '',
});
/** 发送绑定/取消绑定邮箱验证码 */
const sendBindEmailCode = async () => {
  if (bindEmailForm.value.email === '')
    return window.$message.warning('请输入邮箱!');
  try {
    loading.value = true;
    let message = '';
    if (userInfo.value.email_users[0]) {
      const res: any = await fetchCancelSendBindEmailCode(
        bindEmailForm.value.email
      );
      message = res.message;
    } else {
      const res: any = await fetchSendBindEmailCode(bindEmailForm.value.email);
      message = res.message;
    }
    loading.value = false;
    window.$message.success(message);
    downCount.value = 60;
    const timer = setInterval(() => {
      downCount.value -= 1;
      if (downCount.value === 0) {
        clearInterval(timer);
      }
    }, 1000);
  } catch (error: any) {
    loading.value = false;
    window.$message.error(error.message);
  }
};

/** platform: github, qq */
const handleBindThird = async (platform) => {
  if (platform === 'qq') {
    if (userInfo.value.qq_users[0]) {
      console.log('解绑qq');
      const res: any = await fetchCancelBindQQ();
      window.$message.success(res.message);
    } else {
      useQQLogin();
    }
  } else {
    if (userInfo.value.github_users[0]) {
      console.log('解绑github');
      const res: any = await fetchCancelBindGithub();
      window.$message.success(res.message);
    } else {
      useGithubLogin();
    }
  }
  userStore.getUserInfo();
};

const ajaxBindEmailForm = async () => {
  const res: any = await fetchBindEmail(bindEmailForm.value);
  window.$message.success(res.message);
  bindEmailForm.value = {
    email: '',
    code: '',
  };
};

const ajaxCancelBindEmailForm = async () => {
  const res: any = await fetchCancelBindEmail(bindEmailForm.value.code);
  window.$message.success(res.message);
  bindEmailForm.value = {
    email: '',
    code: '',
  };
};
const resetPwd = () => {
  currCpt.value = 'ResetPwdCpt';
};
const getPwd = async () => {
  const res = await fetchUserPwd();
  password.value = res.data.password;
  window.$message.success('获取密码成功！');
};

const submitCallback = () => {
  return new Promise((res, rej) => {
    // @ts-ignore
    bindEmailFormRef.value.validate(async (errors) => {
      if (!errors) {
        try {
          // @ts-ignore
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
  // @ts-ignore
  if (userInfo.value.email_users[0]) {
    // @ts-ignore
    bindEmailForm.value.email = userInfo.value.email_users[0].email;
  }
  showModal.value = true;
};

const handlePositiveClick = () => {
  // @ts-ignore
  if (userInfo.value.email_users[0]) {
    // @ts-ignore
    bindEmailForm.value.email = userInfo.value.email_users[0].email;
  }
  showModal.value = true;
};
const handleNegativeClick = () => {};
const negativeClick = () => {
  currCpt.value = '';
};
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
        width: 80px;
        margin: 10px;
      }
      .content {
        flex: 1;
      }
    }
  }
}
</style>
