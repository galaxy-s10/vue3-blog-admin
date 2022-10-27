import { columnsConfig } from './columns.config';

import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { ISearch, IUser } from '@/interface';

export const searchFormConfig: IForm<ISearch<IUser>> = {
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
      field: 'status',
      type: 'radio',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '正常', value: 1 },
        { label: '禁用', value: 2 },
      ],
    },
    {
      field: 'keyWord',
      type: 'input',
      label: '关键字',
      placeholder: '用户名/简介',
    },
    ...useOrder(columnsConfig),
  ],
};
