import { columnsConfig } from './columns.config';

import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { IComment, ISearch } from '@/interface';

export const searchFormConfig: IForm<ISearch<IComment>> = {
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
      placeholder: '评论内容',
    },
    ...useOrder(columnsConfig),
  ],
};
