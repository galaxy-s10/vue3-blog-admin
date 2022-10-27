import { columnsConfig } from './columns.config';

import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { IAuth, ISearch } from '@/interface';

export const searchFormConfig: IForm<ISearch<IAuth>> = {
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
      field: 'keyWord',
      type: 'input',
      label: '关键字',
      placeholder: '名称/标识',
    },
    {
      field: 'type',
      type: 'radio',
      label: '类型',
      placeholder: '请选择类型',
      options: [
        { label: '默认权限', value: 1 },
        { label: '自定义', value: 2 },
      ],
    },
    ...useOrder(columnsConfig),
  ],
};
