import { IForm } from '@/components/Base/Form';

export const formConfig: IForm = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '名称',
      placeholder: '请输入名称',
      rule: { required: true },
    },
    {
      field: 'desc',
      type: 'input',
      label: '简介',
      placeholder: '请输入简介',
      rule: { required: true },
    },
    {
      field: 'bg_url',
      type: 'input',
      label: '背景图',
      placeholder: '请输入背景图',
      rule: { required: true },
    },
    {
      field: 'url',
      type: 'input',
      label: '线上地址',
      placeholder: '请输入线上地址',
      rule: { required: true },
    },
    {
      field: 'priority',
      type: 'number',
      label: '权重',
      placeholder: '请输入权重',
    },
    {
      field: 'status',
      type: 'switch',
      label: '状态',
      checkedValue: 1,
      unCheckedValue: 2,
      checkedText: '已发布',
      unCheckedText: '未发布',
    },
  ],
};
