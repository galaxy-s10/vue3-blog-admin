<template>
  <div class="account-wrap">
    <div class="item">
      <div class="label">邮箱</div>
      <div class="content">
        {{ userInfo.email_users[0] ? userInfo.email_users[0].email : '未绑定' }}
      </div>
      <n-button text type="info">
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
      <n-button text type="info">
        {{ userInfo.github_users[0] ? '解绑' : '绑定' }}
      </n-button>
    </div>
    <div class="item">
      <div class="label">QQ</div>
      <div class="content">
        {{ userInfo.qq_users[0] ? userInfo.qq_users[0].nickname : '未绑定' }}
      </div>
      <n-button text type="info">
        {{ userInfo.qq_users[0] ? '解绑' : '绑定' }}
      </n-button>
    </div>
    <div class="item">
      <div class="label">密码</div>
      <div class="content"></div>
      <n-button text type="info">重置</n-button>
    </div>
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
.account-wrap {
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
</style>
