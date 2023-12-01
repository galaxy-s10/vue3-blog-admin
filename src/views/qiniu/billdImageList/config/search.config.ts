import { IForm } from '@/components/Base/Form';
import { QINIU_BLOG } from '@/constant';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, IQiniuData, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<IQiniuData>> = {
  gridSpan: 8,
  labelPlacement: 'left',
  formStyle: {
    justifyContent: 'center',
  },
  formItems: [
    {
      field: 'prefix',
      type: FormTypeEnum.select,
      label: '前缀',
      placeholder: '请选择前缀',
      options: Object.keys(QINIU_BLOG.prefix).map((v) => {
        return { label: v, value: v };
      }),
      disabled: true,
    },
    {
      field: 'id',
      type: FormTypeEnum.input,
      label: 'id',
      placeholder: '请输入id',
    },
    {
      field: 'keyWord',
      type: FormTypeEnum.input,
      label: '关键字',
      placeholder: '输入qiniu_key',
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
