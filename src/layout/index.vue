<template>
  <n-space vertical class="layout-wrap">
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
          v-model:value="currentPath"
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
        <TagBarCpt></TagBarCpt>
        <div class="main-wrap">
          <router-view></router-view>
        </div>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { h, ref, watch, defineComponent } from 'vue';
import { CaretDownOutline } from '@vicons/ionicons5';
import type { RouteRecordRaw } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
import { defaultRoutes, iconMap, asyncRoutes } from '@/router/index';
import { deepClone } from '@/utils/index';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import HeaderCpt from './header/header.vue';
import TagBarCpt from './tagbar/tagbar.vue';

export default defineComponent({
  components: {
    HeaderCpt,
    TagBarCpt,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const appStore = useAppStore();
    const userStore = useUserStore();
    const routes = deepClone([...defaultRoutes, ...asyncRoutes]);

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
    const path = ref(route.path);
    watch(
      () => route.path,
      () => {
        appStore.setPath(route.path);
      }
    );
    appStore.setRoutes(menuOptions);
    appStore.setPath(route.path);
    appStore.setTagbarList({ [route.path]: route.meta.title });

    const handleUpdateValue = (key: string, item) => {
      if (!appStore.tagbarList[key]) {
        appStore.setTagbarList({
          ...appStore.tagbarList,
          [key]: item.meta.title,
        });
      }
      router.push(key);
    };

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
        return h('n-icon', null, { default: () => h(CaretDownOutline) });
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-wrap {
  .main-wrap {
    padding: 10px;
  }
}
</style>
