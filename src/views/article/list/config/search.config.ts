import { columnsConfig } from './columns.config';

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
      field: 'status',
      type: 'radio',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '已审核', value: 1 },
        { label: '未审核', value: 2 },
      ],
    },
    {
      field: 'keyWord',
      type: 'input',
      label: '关键字',
      placeholder: '文章标题/简介/内容',
    },
    ...useOrder(columnsConfig),
  ],
};
