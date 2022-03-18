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
  NDataTable,
  NSpin,
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
  NDataTable,
  NSpin,
];

export const naive = create({
  components,
});
