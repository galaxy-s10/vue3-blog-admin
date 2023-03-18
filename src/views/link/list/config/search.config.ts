import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, ILink, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<ILink>> = {
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
      field: 'status',
      type: FormTypeEnum.radio,
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '已审核', value: 1 },
        { label: '未审核', value: 2 },
      ],
    },
    {
      field: 'keyWord',
      type: FormTypeEnum.input,
      label: '关键字',
      placeholder: '友链名称/链接/简介',
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
