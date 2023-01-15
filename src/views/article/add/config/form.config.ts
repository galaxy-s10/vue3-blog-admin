import { fetchTagList } from '@/api/tag';
import { fetchTypeList } from '@/api/type';
import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, IArticle } from '@/interface';

export const formConfig = async (): Promise<IForm<IArticle>> => {
  const [tagList, typeList] = await Promise.all([
    fetchTagList({}),
    fetchTypeList({}),
  ]);
  return {
    gridSpan: 16,
    formStyle: {
      justifyContent: 'center',
    },
    labelPlacement: 'left',
    formItems: [
      {
        field: 'title',
        type: FormTypeEnum.input,
        label: '标题',
        placeholder: '请输入标题',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'desc',
        type: FormTypeEnum.input,
        label: '简介',
        placeholder: '请输入简介',
      },
      {
        field: 'types',
        type: FormTypeEnum.checkbox,
        label: '分类',
        placeholder: '请选择分类',
        options: typeList.data.rows.map((v) => ({
          label: v.name,
          value: v.id,
        })),
      },
      {
        field: 'tags',
        type: FormTypeEnum.checkbox,
        label: '标签',
        placeholder: '请选择标签',
        options: tagList.data.rows.map((v) => ({ label: v.name, value: v.id })),
      },
      {
        field: 'status',
        type: FormTypeEnum.switch,
        label: '审核开关',
        switchConfig: {
          checkedValue: 1,
          unCheckedValue: 2,
          checkedText: '已审核',
          unCheckedText: '未审核',
        },
      },
      {
        field: 'is_comment',
        type: FormTypeEnum.switch,
        label: '评论开关',
        switchConfig: {
          checkedValue: 1,
          unCheckedValue: 2,
          checkedText: '开启',
          unCheckedText: '关闭',
        },
      },
      {
        field: 'head_img',
        type: FormTypeEnum.upload,
        uploadConfig: {
          max: 1,
        },
        label: '封面图',
      },
      {
        field: 'priority',
        type: FormTypeEnum.number,
        label: '权重',
        placeholder: '请输入权重',
      },
      {
        field: 'content',
        type: FormTypeEnum.markdown,
        label: '内容',
        placeholder: '请输入内容',
        gridSpan: 24,
        rule: [{ required: true, trigger: 'blur' }],
      },
    ],
  };
};
