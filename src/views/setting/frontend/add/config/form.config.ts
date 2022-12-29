import { IForm } from '@/components/Base/Form';
import { IFrontend, formTypeEnum } from '@/interface';

export const formConfig: IForm<IFrontend> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'type',
      type: 'select',
      options: Object.keys(formTypeEnum).map((v) => {
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
      type: 'input',
      label: 'key',
      placeholder: '请输入key',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'value',
      type: 'markdown',
      label: 'value',
      placeholder: '请输入value',
      gridSpan: 24,
      rule: { required: true, trigger: 'blur' },
    },

    {
      field: 'desc',
      type: 'input',
      label: 'desc',
      placeholder: '请输入desc',
      rule: [{ required: true, trigger: 'blur' }],
    },
  ],
};
