import { IForm } from '@/components/Base/Form';

export const formConfig: IForm = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '标题',
      placeholder: '请输入标题',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'desc',
      type: 'input',
      label: '简介',
      placeholder: '请输入简介',
    },
    {
      field: 'is_comment',
      type: 'switch',
      label: '评论开关',
      checkedValue: 1,
      unCheckedValue: 2,
      checkedText: '开启',
      unCheckedText: '关闭',
    },
    {
      field: 'head_img',
      type: 'input',
      label: '封面图',
      placeholder: '请输入封面图',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'content',
      type: 'markdown',
      label: '内容',
      placeholder: '请输入内容',
      gridSpan: 24,
      rule: [{ required: true, trigger: 'blur' }],
    },
  ],
};
