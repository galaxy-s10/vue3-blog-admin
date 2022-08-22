import { IForm } from '@/components/Base/Form';
import { QINIU_PREFIX } from '@/constant';

export const formConfig: IForm = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'prefix',
      type: 'select',
      options: Object.keys(QINIU_PREFIX).map((v) => {
        return { label: v, value: QINIU_PREFIX[v] };
      }),
      label: 'prefix',
      placeholder: '请选择前缀',
      rule: { required: true, trigger: 'blur' },
    },
    {
      field: 'uploadFiles',
      type: 'upload',
      label: '文件',
      placeholder: '请选择文件',
      rule: { required: true, trigger: 'blur', type: 'array' },
    },
  ],
};
