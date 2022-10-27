import { useUserStore } from '@/store/user';

export default {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created() {
    // console.log('created');
  },
  // 在元素被插入到 DOM 前调用
  beforeMount() {
    // console.log('beforeMount');
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding) {
    // console.log('mounted', el, binding, vnode, prevVnode);
    const { value } = binding;
    const userStore = useUserStore();
    const roles = userStore.roles;
    if (value && roles) {
      const isPermission = roles.some((item) => {
        if (item.role_value === value) {
          return true;
        }
      });
      if (!isPermission) {
        // auth验证不通过！
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate() {
    // console.log('beforeUpdate');
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated() {
    // console.log('updated');
  },
  // 绑定元素的父组件卸载前调用
  beforeUnmount() {
    // console.log('beforeUnmount');
  },
  // 绑定元素的父组件卸载后调用
  unmounted() {
    // console.log('unmounted');
  },
};
