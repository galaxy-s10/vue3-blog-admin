import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, ISearch, IStar } from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<IStar>> = {
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
    {
      field: 'article_id',
      type: FormTypeEnum.input,
      label: '文章id',
      placeholder: '请输入文章id',
    },
    {
      field: 'from_user_id',
      type: FormTypeEnum.input,
      label: '点赞用户id',
      placeholder: '请输入点赞用户id',
    },
    {
      field: 'to_user_id',
      type: FormTypeEnum.input,
      label: '被点赞用户id',
      placeholder: '请输入被点赞用户id',
    },
    ...useOrder(columnsConfig),
  ],
};
