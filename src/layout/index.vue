<template>
  <n-space class="layout-wrap">
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
          :value="currentPath"
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
        <TabListCpt></TabListCpt>
        <div class="main-wrap">
          <router-view></router-view>
        </div>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { CaretDownOutline } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { defineComponent, h, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import HeaderCpt from './header/header.vue';
import TabListCpt from './tabList/tabList.vue';

import type { RouteRecordRaw } from 'vue-router';

import { defaultRoutes, iconMap } from '@/router/index';
import { useAppStore } from '@/store/app';

export default defineComponent({
  components: {
    HeaderCpt,
    TabListCpt,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const appStore = useAppStore();
    const handleRoutes = (routes: RouteRecordRaw[]) => {
      routes.forEach((v) => {
        if (v.children && v.children.length === 1) {
          v.meta = {
            title: v.children[0].meta?.title,
            icon: v.children[0].meta?.icon,
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
          if (!v.meta?.hidden) {
            // @ts-ignore
            v.label = v.meta && v.meta.title;
            // @ts-ignore
            v.key = v.path;
          }
        }
      });
      return routes;
    };
    const menuOptions = handleRoutes([
      ...defaultRoutes,
      ...appStore.routes,
    ]).filter((v) => v.meta && !v.meta.hidden);

    const handleUpdateValue = (key: string, item) => {
      path.value = key;
      if (!appStore.tabList[key]) {
        appStore.setTabList({
          ...appStore.tabList,
          [key]: item.meta.title,
        });
      }
      router.push(key);
    };
    let path = ref(route.path);
    watch(
      () => route.path,
      () => {
        appStore.setPath(route.path);
        path.value = route.path;
      }
    );
    appStore.setRoutes(menuOptions);
    appStore.setPath(route.path);
    appStore.setTabList({ [route.path]: route.meta.title });

    return {
      collapsed: ref(false),
      menuOptions,
      currentPath: path,
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
.layout-wrap {
  height: 100vh;
  .main-wrap {
    padding: 10px;
  }
}
</style>
