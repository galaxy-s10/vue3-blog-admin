<template>
  <header class="header-warp">
    <div class="left">
      <BreadcrumbCpt></BreadcrumbCpt>
    </div>
    <div class="action">
      <div class="lang">
        <n-icon size="20">
          <language></language>
        </n-icon>
      </div>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <div class="user">
          <img
            class="avatar"
            src="https://img.cdn.hsslive.cn/1613141138717Billd.jpg"
            alt=""
          />
          <span class="name">admin</span>
        </div>
      </n-dropdown>
      <div class="setting">
        <n-icon size="20">
          <SettingsOutline></SettingsOutline>
        </n-icon>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NIcon, NDropdown } from 'naive-ui';
import { Language, SettingsOutline } from '@vicons/ionicons5';
import BreadcrumbCpt from '@/components/Breadcrumb/index.vue';

export default defineComponent({
  components: { BreadcrumbCpt, NIcon, Language, SettingsOutline, NDropdown },
  setup() {
    const options = ref([
      {
        label: '账号设置',
        key: '1',
      },
      {
        label: '退出登录',
        key: '2',
      },
    ]);
    return { options };
  },
});
</script>

<style lang="scss" scoped>
.header-warp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-bottom: 1px solid #eee;
  .left {
    padding: 0 10px;
  }
  .action {
    display: flex;
    align-items: center;
    min-width: 150px;
    > div:hover {
      cursor: pointer;
      background-color: #f6f6f6;
    }
    .user {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 48px;
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .name {
        margin-left: 6px;
        font-size: 20px;
      }
    }
    .lang,
    .setting {
      display: inline-flex;
      height: 48px;
      align-items: center;
      padding: 0 10px;
    }
  }
}
</style>
