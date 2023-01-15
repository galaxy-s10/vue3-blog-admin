import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, IType } from '@/interface';

export const formConfig: IForm<IType> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'name',
      type: FormTypeEnum.input,
      label: '分类名',
      placeholder: '请输入分类名',
    },
  ],
};
