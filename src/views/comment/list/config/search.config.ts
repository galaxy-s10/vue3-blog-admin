import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, IComment, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<IComment>> = {
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
      label: '留言用户id',
      placeholder: '请输入留言用户id',
    },
    {
      field: 'to_user_id',
      type: FormTypeEnum.input,
      label: '被留言用户id',
      placeholder: '请输入被留言用户id',
    },
    {
      field: 'status',
      type: FormTypeEnum.radio,
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '显示', value: 1 },
        { label: '隐藏', value: 2 },
      ],
    },
    {
      field: 'keyWord',
      type: FormTypeEnum.input,
      label: '关键字',
      placeholder: '评论内容/user_agent/ip/ip信息',
    },
    {
      field: 'rangTimeType',
      type: FormTypeEnum.datePicker,
      label: '时间范围',
      placeholder: '请选择时间范围',
    },
    ...useOrder(columnsConfig),
  ],
};
