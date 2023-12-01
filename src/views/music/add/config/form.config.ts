import { IForm } from '@/components/Base/Form';
import { QINIU_BLOG } from '@/constant';
import { FormTypeEnum, IMusic } from '@/interface';

export const formConfig: IForm<IMusic> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'name',
      type: FormTypeEnum.input,
      label: '歌名',
      placeholder: '请输入歌名',
    },
    {
      field: 'cover_pic',
      type: FormTypeEnum.upload,
      label: '封面图',
      uploadConfig: {
        max: 1,
        prefix: QINIU_BLOG.prefix['image/'],
      },
      rule: { required: true, trigger: 'blur', type: 'array' },
    },
    {
      field: 'author',
      type: FormTypeEnum.input,
      label: '作者',
      placeholder: '请输入作者',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'audio_url',
      type: FormTypeEnum.upload,
      label: '音频资源',
      uploadConfig: {
        max: 1,
        prefix: QINIU_BLOG.prefix['media/'],
      },
      rule: { required: true, trigger: 'blur', type: 'array' },
    },
    {
      field: 'status',
      type: FormTypeEnum.switch,
      label: '状态',
      switchConfig: {
        checkedValue: 1,
        unCheckedValue: 2,
        checkedText: '已审核',
        unCheckedText: '未审核',
      },
    },
  ],
};
