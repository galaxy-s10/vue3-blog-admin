<template>
  <div>
    <n-space vertical>
      <n-switch :value="collapsed" />
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
            :options="aaa"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
          />
        </n-layout-sider>
        <n-layout>
          <span>1</span>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script lang="ts">
import { h, ref, defineComponent } from 'vue';
import {
  NSpace,
  NSwitch,
  NIcon,
  NMenu,
  NLayout,
  NLayoutSider,
  NButton,
} from 'naive-ui';
import { CaretDownOutline } from '@vicons/ionicons5';
import type { RouteRecordRaw } from 'vue-router';
import { defaultRoutes, iconMap, roleRoutes } from '../router/index';
import { deepClone } from '../utils/index';

export default defineComponent({
  components: {
    NSpace,
    NSwitch,
    NMenu,
    NLayout,
    NLayoutSider,
  },
  setup() {
    console.log(defaultRoutes);
    const routes = deepClone([...defaultRoutes, ...roleRoutes]);
    const handleRoutes = (routes: RouteRecordRaw[]) => {
      routes.forEach((v) => {
        if (v.children && v.children.length === 1) {
          v.meta = {
            label: v.children[0].meta.title,
            icon: v.children[0].meta.icon,
          };
          // @ts-ignore
          v.label = v.children[0].meta.title;
          delete v.children;
        } else if (v.children && v.children.length > 1) {
          // @ts-ignore
          v.label = v.meta && v.meta.title;
          // @ts-ignore
          v.key = v.path;
          handleRoutes(v.children);
        } else if (!v.children) {
          if (v.meta.hidden) {
            // @ts-ignore
            v.label = 'hidden';
            console.log(v, 111111);
          } else {
            // @ts-ignore
            v.label = v.meta && v.meta.title;
          }
        }
      });
      return routes;
    };
    const aaa = handleRoutes(routes).filter((v) => v.meta && !v.meta.hidden);
    console.log(aaa);
    const menuOptions = [
      {
        label: '且听风吟',
        key: 'hear-the-wind-sing',
        href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199',
      },
      {
        label: '1973年的弹珠玩具',
        key: 'pinball-1973',
        disabled: true,
        children: [
          {
            label: '鼠',
            key: 'rat',
          },
        ],
      },
      {
        label: '寻羊冒险记',
        key: 'a-wild-sheep-chase',
        disabled: true,
      },
      {
        label: '舞，舞，舞',
        key: 'dance-dance-dance',
        children: [
          {
            type: 'group',
            label: '人物',
            key: 'people',
            children: [
              {
                label: '叙事者',
                key: 'narrator',
              },
              {
                label: '羊男',
                key: 'sheep-man',
              },
            ],
          },
          {
            label: '饮品',
            key: 'beverage',
            children: [
              {
                label: '威士忌',
                key: 'whisky',
                href: 'https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin',
              },
            ],
          },
          {
            label: '食物',
            key: 'food',
            children: [
              {
                label: '三明治',
                key: 'sandwich',
              },
            ],
          },
          {
            label: '过去增多，未来减少',
            key: 'the-past-increases-the-future-recedes',
          },
        ],
      },
    ];
    return {
      collapsed: ref(true),
      menuOptions,
      aaa,
      renderMenuLabel(option) {
        // console.log(option, 11111);
        return option.label;
      },
      renderMenuIcon(option) {
        // 渲染图标占位符以保持缩进
        // if (option.key === 'sheep-man') return true;
        // // 返回 falsy 值，不再渲染图标及占位符
        // if (option.key === 'food') return null;
        // return h(NIcon, null, { default: () => h(BookmarkOutline) });
        // console.log(option, 321);
        const vn = option.meta && option.meta.icon;
        console.log(vn, NButton);
        // return h(vn);
        return vn && h(iconMap(vn));
        // return h('div', null, { default: () => h(NButton) });
        // return h(NIcon, null, { default: () => vn });
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
    };
  },
});
</script>

<style lang="scss" scoped></style>
