import { IForm } from '@/components/Base/Form';

export const formConfig: IForm = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'model',
      type: 'input',
      label: '模块',
      placeholder: '请输入模块',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'lang',
      type: 'input',
      label: '语言',
      placeholder: '请输入语言',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'key',
      type: 'input',
      label: '主题key',
      placeholder: '请输入主题key',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'value',
      type: 'input',
      label: '主题value',
      placeholder: '请输入主题value',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'desc',
      type: 'input',
      label: '简介',
      placeholder: '请输入简介',
    },
  ],
};
