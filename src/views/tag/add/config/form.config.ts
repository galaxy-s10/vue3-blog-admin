import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, ITag } from '@/interface';

export const formConfig: IForm<ITag> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'name',
      type: FormTypeEnum.input,
      label: '标签名',
      placeholder: '请输入标签名',
    },
    {
      field: 'color',
      type: FormTypeEnum.input,
      label: '颜色',
      placeholder: '请输入颜色',
      rule: { required: true, trigger: 'blur' },
    },
  ],
};
