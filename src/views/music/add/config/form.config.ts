import { IForm } from '@/components/Base/Form';
import { QINIU_PREFIX } from '@/constant';

export const formConfig: IForm = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '歌名',
      placeholder: '请输入歌名',
    },
    {
      field: 'cover_pic',
      type: 'upload',
      label: '封面图',
      uploadConfig: {
        max: 1,
        prefix: QINIU_PREFIX['image/'],
      },
      rule: { required: true, trigger: 'blur', type: 'array' },
    },
    {
      field: 'author',
      type: 'input',
      label: '作者',
      placeholder: '请输入作者',
      rule: [{ required: true, trigger: 'blur' }],
    },
    {
      field: 'audio_url',
      type: 'upload',
      label: '音频资源',
      uploadConfig: {
        max: 1,
        prefix: QINIU_PREFIX['media/'],
      },
      rule: { required: true, trigger: 'blur', type: 'array' },
    },
    {
      field: 'status',
      type: 'switch',
      label: '状态',
      checkedValue: 1,
      unCheckedValue: 2,
      checkedText: '已审核',
      unCheckedText: '未审核',
    },
  ],
};
