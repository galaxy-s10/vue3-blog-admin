<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in list" :key="item.path">
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch } from 'vue';
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import { useAppStore } from '@/store/app';

export default defineComponent({
  components: { NBreadcrumb, NBreadcrumbItem },
  setup() {
    const appStore = useAppStore();
    const { path, routes } = toRefs(appStore.$state);
    const handleTree = (source, target) => {
      const res = [];
      const t = target.split('/');
      const originSource = JSON.parse(JSON.stringify(source));
      const find = (source, target) => {
        for (let i = 0; i < source.length; i += 1) {
          const item = source[i];
          if (item.key === target) {
            res.unshift(item);
            t.pop();
            const pid = t.join('/');
            if (pid !== '') {
              find(originSource, pid);
            }
            break;
          } else if (item.children) {
            find(item.children, target);
          }
        }
      };
      find(source, target);
      // console.log(res[0].meta);
      return res;
    };
    const res = ref(handleTree(routes.value, path.value));
    watch(
      () => path.value,
      () => {
        res.value = reactive(handleTree(routes.value, path.value));
      }
    );
    return {
      list: res,
    };
  },
});
</script>

<style lang="scss" scoped></style>
