import {
  create,
  NBreadcrumb,
  NBreadcrumbItem,
  NButton,
  NDropdown,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NLayout,
  NLayoutSider,
  NMenu,
  NMessageProvider,
  NSpace,
} from 'naive-ui';

const components = [
  NBreadcrumb,
  NBreadcrumbItem,
  NMessageProvider,
  NSpace,
  NIcon,
  NMenu,
  NLayout,
  NLayoutSider,
  NDropdown,
  NButton,
  NInput,
  NForm,
  NFormItem,
];

export const naive = create({
  components,
});
