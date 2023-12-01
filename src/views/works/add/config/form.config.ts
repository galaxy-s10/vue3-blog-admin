import { IForm } from '@/components/Base/Form';
import { QINIU_BLOG } from '@/constant';
import { FormTypeEnum, IWorks } from '@/interface';

export const formConfig: IForm<IWorks> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'name',
      type: FormTypeEnum.input,
      label: '名称',
      placeholder: '请输入名称',
      rule: { required: true },
    },
    {
      field: 'desc',
      type: FormTypeEnum.input,
      label: '简介',
      placeholder: '请输入简介',
      rule: { required: true },
    },
    {
      field: 'bg_url',
      type: FormTypeEnum.upload,
      label: '背景图',
      uploadConfig: {
        max: 1,
        prefix: QINIU_BLOG.prefix['image/'],
      },
      rule: { required: true, trigger: 'blur', type: 'array' },
    },
    {
      field: 'url',
      type: FormTypeEnum.input,
      label: '线上地址',
      placeholder: '请输入线上地址',
      rule: { required: true },
    },
    {
      field: 'priority',
      type: FormTypeEnum.number,
      label: '权重',
      placeholder: '请输入权重',
    },
    {
      field: 'status',
      type: FormTypeEnum.switch,
      label: '状态',
      switchConfig: {
        checkedValue: 1,
        unCheckedValue: 2,
        checkedText: '已发布',
        unCheckedText: '未发布',
      },
    },
  ],
};
