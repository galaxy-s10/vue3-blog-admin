import { columnsConfig } from './columns.config';

import { IForm } from '@/components/Base/Form';
import { QINIU_PREFIX } from '@/constant';
import { useOrder } from '@/hooks/use-order';
import { IQiniuData, ISearch } from '@/interface';

export const searchFormConfig: IForm<ISearch<IQiniuData>> = {
  gridSpan: 8,
  labelPlacement: 'left',
  formStyle: {
    justifyContent: 'center',
  },
  formItems: [
    {
      field: 'prefix',
      type: 'select',
      label: '前缀',
      placeholder: '请选择前缀',
      options: Object.keys(QINIU_PREFIX).map((v) => {
        return { label: v, value: v };
      }),
      disabled: true,
    },
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id',
    },
    {
      field: 'keyWord',
      type: 'input',
      label: '关键字',
      placeholder: '输入qiniu_key',
    },
    ...useOrder(columnsConfig),
  ],
};
