import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, ILink } from '@/interface';

export const formConfig: IForm<ILink> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'email',
      type: FormTypeEnum.input,
      label: '邮箱',
      placeholder: '请输入邮箱',
    },
    {
      field: 'name',
      type: FormTypeEnum.input,
      label: '名称',
      placeholder: '请输入名称',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'avatar',
      type: FormTypeEnum.input,
      label: '头像',
      placeholder: '请输入头像',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'priority',
      type: FormTypeEnum.number,
      label: '权重',
      placeholder: '请输入权重',
    },
    {
      field: 'desc',
      type: FormTypeEnum.input,
      label: '简介',
      placeholder: '请输入简介',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'url',
      type: FormTypeEnum.input,
      label: '地址',
      placeholder: '请输入地址',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'status',
      type: FormTypeEnum.switch,
      label: '状态',
      switchConfig: {
        checkedValue: 1,
        unCheckedValue: 2,
        checkedText: '已审核',
        unCheckedText: '未审核',
      },
    },
  ],
};
