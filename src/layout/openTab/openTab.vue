<template>
  <div class="tagbar-wrap">
    <div
      ref="listRef"
      class="list-wrap"
    >
      <div
        v-for="item in list"
        :key="item.path"
        class="tag"
        @click="pushPath(item)"
      >
        <i
          class="dot"
          :class="{ curr: item.key === path ? true : false }"
        ></i>
        <span> {{ item.value }} </span>
        <n-icon
          size="18"
          @click.stop="close(item)"
        >
          <CloseOutline></CloseOutline>
        </n-icon>
      </div>
    </div>
    <div class="action">
      <n-dropdown
        trigger="hover"
        :options="options"
        @select="closeTag"
      >
        <n-icon
          size="18"
          class="ico"
        >
          <ChevronDownOutline></ChevronDownOutline>
        </n-icon>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { ChevronDownOutline, CloseOutline } from '@vicons/ionicons5';
import { defineComponent, ref, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';

import router from '@/router';
import { useAppStore } from '@/store/app';

export default defineComponent({
  components: {
    CloseOutline,
    ChevronDownOutline,
  },
  setup() {
    const appStore = useAppStore();
    const route = useRoute();
    const { tabList, path } = toRefs(appStore);
    const list1: any = ref([]);
    const listRef = ref<HTMLElement>();
    const res: { key: string; value: string }[] = [];
    Object.keys(tabList.value).forEach((v) => {
      res.push({ key: v, value: tabList.value[v] });
    });
    const options = [
      {
        label: '关闭左侧标签',
        key: '1',
      },
      {
        label: '关闭右侧标签',
        key: '2',
      },
      {
        label: '关闭其他标签',
        key: '3',
      },
    ];
    list1.value = res;

    watch(
      () => tabList.value,
      (newVal) => {
        const val: any[] = [];
        Object.keys(newVal).forEach((v) => {
          val.push({ key: v, value: newVal[v] });
        });
        list1.value = val;
      }
    );
    watch(
      () => route.path,
      () => {
        const dom = listRef.value!;
        const halfOfWindowWidth = Math.ceil(dom.clientWidth / 2); // 父容器宽度的一半（即父容器的居中位置）
        list1.value.forEach((v, i) => {
          if (v.key === route.path) {
            const parentEle = dom;
            const currentEle = dom.children[i];
            // @ts-ignore
            const currentEleOffsetLeft = dom.children[i].offsetLeft;
            parentEle.scrollTo({
              left:
                currentEleOffsetLeft -
                halfOfWindowWidth +
                // @ts-ignore
                currentEle.offsetWidth / 2,
              behavior: 'smooth',
            });
          }
        });
      }
    );
    const close = (item) => {
      const list = { ...tabList.value };
      if (Object.keys(list).length <= 1) {
        window.$message.warning('不能删了');
        return;
      }
      let index = 0;
      list1.value.forEach((v, i) => {
        if (v.key === item.key) {
          index = i;
        }
      });
      if (item.key === route.path) {
        router.push({
          path: list1.value[
            index + 1 >= list1.value.length ? list1.value.length - 2 : index + 1
          ].key,
        });
      }

      delete list[item.key];
      appStore.setTabList(list);
    };
    const pushPath = (item) => {
      router.push(item.key);
    };
    const closeTag = () => {};
    const scrollFn = () => {};
    return {
      route,
      path,
      list: list1,
      close,
      pushPath,
      options,
      closeTag,
      scrollFn,
      listRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../../assets/css/constant.scss';
.tagbar-wrap {
  padding: 6px;
  border-bottom: 1px solid #eee;
  margin: 0;
  display: flex;
  justify-content: space-between;
  .list-wrap {
    /* width: 300px; */
    flex: 1;
    display: flex;
    overflow-x: scroll;
    @extend .hideScrollbar;
    .tag {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      padding: 2px 10px;
      background-color: #fbf9fc;
      border: 1px solid #18a058;
      margin-right: 10px;
      cursor: pointer;
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 4px;
        background-color: #18a058;

        &.curr {
          background-color: #2080f0;
        }
      }
    }
  }
  .action {
    padding: 0 4px;
    .ico {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
}
</style>
