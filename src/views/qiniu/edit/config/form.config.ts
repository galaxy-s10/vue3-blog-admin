import { IForm } from '@/components/Base/Form';
import { IQiniuData } from '@/interface';

export const formConfig: IForm<IQiniuData> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'qiniu_key',
      type: 'input',
      label: '文件名',
      placeholder: '请输入文件名',
    },
  ],
};
