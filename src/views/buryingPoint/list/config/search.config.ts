import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, IBuryingPoint, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<IBuryingPoint>> = {
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
      field: 'user_id',
      type: FormTypeEnum.input,
      label: '用户id',
      placeholder: '请输入用户id',
    },
    {
      field: 'extend_field_a',
      type: FormTypeEnum.input,
      label: '扩展字段a',
      placeholder: '请输入扩展字段a',
    },
    {
      field: 'extend_field_b',
      type: FormTypeEnum.input,
      label: '扩展字段b',
      placeholder: '请输入扩展字段b',
    },
    {
      field: 'extend_field_c',
      type: FormTypeEnum.input,
      label: '扩展字段c',
      placeholder: '请输入扩展字段c',
    },
    {
      field: 'extend_field_d',
      type: FormTypeEnum.input,
      label: '扩展字段d',
      placeholder: '请输入扩展字段d',
    },
    {
      field: 'extend_field_e',
      type: FormTypeEnum.input,
      label: '扩展字段e',
      placeholder: '请输入扩展字段e',
    },
    {
      field: 'extend_field_f',
      type: FormTypeEnum.input,
      label: '扩展字段f',
      placeholder: '请输入扩展字段f',
    },
    {
      field: 'extend_field_g',
      type: FormTypeEnum.input,
      label: '扩展字段g',
      placeholder: '请输入扩展字段g',
    },
    {
      field: 'keyWord',
      type: FormTypeEnum.input,
      label: '关键字',
      placeholder: 'ip/user_agent/备注',
    },
    ...useOrder(columnsConfig),
  ],
};
