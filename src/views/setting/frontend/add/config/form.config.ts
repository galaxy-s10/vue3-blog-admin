import { IForm } from '@/components/Base/Form';
import { IFrontend, FormTypeEnum } from '@/interface';

export const formConfig: IForm<IFrontend> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'type',
      type: FormTypeEnum.select,
      options: Object.keys(FormTypeEnum).map((v) => {
        return {
          label: v,
          value: v,
        };
      }),
      label: 'type',
      placeholder: '请选择type',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'key',
      type: FormTypeEnum.input,
      label: 'key',
      placeholder: '请输入key',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'value',
      type: FormTypeEnum.markdown,
      label: 'value',
      placeholder: '请输入value',
      gridSpan: 24,
      rule: { required: true, trigger: 'blur' },
    },

    {
      field: 'desc',
      type: FormTypeEnum.input,
      label: 'desc',
      placeholder: '请输入desc',
      rule: [{ required: true, trigger: 'blur' }],
    },
  ],
};
