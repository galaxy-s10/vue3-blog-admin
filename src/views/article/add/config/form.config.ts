import { fetchTagList } from '@/api/tag';
import { fetchTypeList } from '@/api/type';
export const formConfig = async () => {
  const params = { nowPage: 1, pageSize: 100 };
  const [tagList, typeList] = await Promise.all([
    fetchTagList(params),
    fetchTypeList(params),
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
        type: 'input',
        label: '标题',
        placeholder: '请输入标题',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'desc',
        type: 'input',
        label: '简介',
        placeholder: '请输入简介',
      },
      {
        field: 'types',
        type: 'checkbox',
        label: '分类',
        placeholder: '请选择分类',
        labelWidth: 100,
        options: typeList.data.rows.map((v) => ({
          label: v.name,
          value: v.id,
        })),
      },
      {
        field: 'tags',
        type: 'checkbox',
        label: '标签',
        placeholder: '请选择标签',
        options: tagList.data.rows.map((v) => ({ label: v.name, value: v.id })),
      },
      {
        field: 'status',
        type: 'switch',
        label: '审核开关',
        checkedValue: 1,
        unCheckedValue: 2,
        checkedText: '已审核',
        unCheckedText: '未审核',
      },
      {
        field: 'is_comment',
        type: 'switch',
        label: '评论开关',
        checkedValue: 1,
        unCheckedValue: 2,
        checkedText: '开启',
        unCheckedText: '关闭',
      },
      {
        field: 'head_img',
        type: 'input',
        label: '封面图',
        placeholder: '请输入封面图',
      },
      {
        field: 'priority',
        type: 'number',
        label: '权重',
        placeholder: '请输入权重',
      },
      {
        field: 'content',
        type: 'markdown',
        label: '内容',
        placeholder: '请输入内容',
        gridSpan: 24,
        rule: [{ required: true, trigger: 'blur' }],
      },
    ],
  };
};
