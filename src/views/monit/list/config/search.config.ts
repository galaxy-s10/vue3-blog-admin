import { columnsConfig, monitTypeMap } from './columns.config';

import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';

export const searchFormConfig: IForm = {
  gridSpan: 8,
  labelPlacement: 'left',
  formStyle: {
    justifyContent: 'center',
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id',
    },
    {
      field: 'type',
      type: 'select',
      label: 'type',
      placeholder: '选择类型',
      options: Object.keys(monitTypeMap).map((v) => {
        return { label: monitTypeMap[v], value: +v };
      }),
    },
    {
      field: 'keyWord',
      type: 'input',
      label: '关键字',
      placeholder: '请输入关键字',
    },
    ...useOrder(columnsConfig),
  ],
};
