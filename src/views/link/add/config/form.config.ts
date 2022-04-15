import { IForm } from '@/components/Base/Form';

export const formConfig: IForm = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'email',
      type: 'input',
      label: '邮箱',
      placeholder: '请输入邮箱',
    },
    {
      field: 'name',
      type: 'input',
      label: '友链名称',
      placeholder: '请输入友链名称',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'avatar',
      type: 'input',
      label: '友链头像',
      placeholder: '请输入友链头像',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'desc',
      type: 'input',
      label: '友链简介',
      placeholder: '请输入友链简介',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'url',
      type: 'input',
      label: '友链地址',
      placeholder: '请输入友链地址',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'status',
      type: 'switch',
      label: '状态',
      checkedValue: 1,
      unCheckedValue: 2,
      checkedText: '已审核',
      unCheckedText: '未审核',
    },
  ],
};
