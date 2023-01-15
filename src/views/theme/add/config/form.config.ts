import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, ITheme } from '@/interface';

export const formConfig: IForm<ITheme> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'model',
      type: FormTypeEnum.input,
      label: '模块',
      placeholder: '请输入模块',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'lang',
      type: FormTypeEnum.input,
      label: '语言',
      placeholder: '请输入语言',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'key',
      type: FormTypeEnum.input,
      label: '主题key',
      placeholder: '请输入主题key',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'value',
      type: FormTypeEnum.input,
      label: '主题value',
      placeholder: '请输入主题value',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'desc',
      type: FormTypeEnum.input,
      label: '简介',
      placeholder: '请输入简介',
    },
  ],
};
