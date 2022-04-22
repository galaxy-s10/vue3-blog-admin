import { IForm } from '@/components/Base/Form';

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
      type: 'input',
      label: '封面图',
      placeholder: '请输入封面图',
      rule: { required: true, trigger: 'blur' },
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
      type: 'input',
      label: '音频资源',
      placeholder: '请输入音频资源',
      rule: [{ required: true, trigger: 'blur' }],
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
