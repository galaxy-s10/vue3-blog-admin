import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { ISearch, IFrontend, FormTypeEnum } from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<IFrontend>> = {
  gridSpan: 8,
  labelPlacement: 'left',
  formStyle: {
    justifyContent: 'center',
  },
  formItems: [
    {
      field: 'id',
      type: FormTypeEnum.input,
      label: 'id',
      placeholder: '请输入id',
    },
    ...useOrder(columnsConfig),
  ],
};
