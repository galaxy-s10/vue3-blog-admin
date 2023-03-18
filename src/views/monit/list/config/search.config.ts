import { IForm } from '@/components/Base/Form';
import { MONIT_TYPE_MAP } from '@/constant';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, IMonit, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<IMonit>> = {
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
      field: 'type',
      type: FormTypeEnum.select,
      label: 'type',
      placeholder: '选择类型',
      options: Object.keys(MONIT_TYPE_MAP).map((v) => {
        return { label: MONIT_TYPE_MAP[v], value: +v };
      }),
    },
    {
      field: 'keyWord',
      type: FormTypeEnum.input,
      label: '关键字',
      placeholder: '请输入关键字',
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
