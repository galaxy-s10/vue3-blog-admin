<template>
  <n-space vertical class="layout">
    <n-layout position="absolute" has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <n-layout>
        <HeaderCpt></HeaderCpt>
        <div class="main">
          <router-view></router-view>
        </div>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { h, ref, watch, defineComponent } from 'vue';
import { NSpace, NIcon, NMenu, NLayout, NLayoutSider } from 'naive-ui';
import { CaretDownOutline } from '@vicons/ionicons5';
import type { RouteRecordRaw } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
import { defaultRoutes, iconMap, roleRoutes } from '@/router/index';
import { deepClone } from '@/utils/index';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import HeaderCpt from './header/index.vue';

export default defineComponent({
  components: {
    NSpace,
    NMenu,
    NLayout,
    NLayoutSider,
    HeaderCpt,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const appStore = useAppStore();
    const userStore = useUserStore();

    const routes = deepClone([...defaultRoutes, ...roleRoutes]);
    const handleRoutes = (routes: RouteRecordRaw[]) => {
      routes.forEach((v) => {
        if (v.children && v.children.length === 1) {
          v.meta = {
            title: v.children[0].meta.title,
            icon: v.children[0].meta.icon,
          };
          // @ts-ignore
          v.label = v.children[0].meta.title;
          // @ts-ignore
          v.key = v.children[0].path;
          delete v.children;
        } else if (v.children && v.children.length > 1) {
          // @ts-ignore
          v.label = v.meta && v.meta.title;
          // @ts-ignore
          v.key = v.path;
          handleRoutes(v.children);
        } else if (!v.children) {
          if (!v.meta.hidden) {
            // @ts-ignore
            v.label = v.meta && v.meta.title;
            // @ts-ignore
            v.key = v.path;
          }
        }
      });
      return routes;
    };
    const menuOptions = handleRoutes(routes).filter(
      (v) => v.meta && !v.meta.hidden
    );
    watch(
      () => route.path,
      () => {
        appStore.$patch((state) => {
          state.path = route.path;
        });
      }
    );
    appStore.setRoutes(menuOptions);
    console.log(userStore.roles[0], menuOptions, 996);
    appStore.$patch((state) => {
      state.path = route.path;
    });
    console.log(route, menuOptions, 111);
    const handleUpdateValue = (key: string, item) => {
      router.push(key);
    };
    return {
      collapsed: ref(false),
      menuOptions,
      handleUpdateValue,
      renderMenuLabel(option) {
        return option.label;
      },
      renderMenuIcon(option) {
        const vn = option.meta && option.meta.icon;
        return vn ? h(iconMap(vn)) : false;
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.layout {
  .main {
    padding: 10px;
  }
}
</style>
