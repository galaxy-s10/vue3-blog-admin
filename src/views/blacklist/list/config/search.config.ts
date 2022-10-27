import { columnsConfig } from './columns.config';

import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { IBlacklist, ISearch } from '@/interface';

export const searchFormConfig: IForm<ISearch<IBlacklist>> = {
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
      placeholder: 'ip/user_id/msg',
    },
    ...useOrder(columnsConfig),
  ],
};
