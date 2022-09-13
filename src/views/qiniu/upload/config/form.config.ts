import { IForm } from '@/components/Base/Form';
import { QINIU_PREFIX } from '@/constant';
import { IQiniuData } from '@/interface';

export const formConfig: IForm<IQiniuData> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    // {
    //   field: 'prefix',
    //   type: 'select',
    //   options: Object.keys(QINIU_PREFIX).map((v) => {
    //     return { label: v, value: QINIU_PREFIX[v] };
    //   }),
    //   label: 'prefix',
    //   placeholder: '请选择前缀',
    //   rule: { required: true, trigger: 'blur' },
    // },
    {
      field: 'qiniu_fsize',
      type: 'upload',
      label: 'qiniu_fsize',
      // placeholder: '请选择文件',
      uploadConfig: {
        // max: 2,
        prefix: QINIU_PREFIX['image/'],
      },
      rule: { required: true, trigger: 'blur', type: 'array' },
    },
    // {
    //   field: 'bucket',
    //   type: 'upload',
    //   label: 'bucket',
    //   placeholder: 'bucket',
    //   uploadConfig: {
    //     // max: 2,
    //     prefix: QINIU_PREFIX['image/'],
    //   },
    //   rule: { required: true, trigger: 'blur', type: 'array' },
    // },
  ],
};
