import { fetchAllList } from '@/api/role';
import { IForm } from '@/components/Base/Form';

export const formConfig = async (): Promise<IForm> => {
  const [allRole]: any = await Promise.all([fetchAllList()]);

  return {
    gridSpan: 16,
    formStyle: {
      justifyContent: 'center',
    },
    labelPlacement: 'left',
    formItems: [
      {
        field: 'p_id',
        type: 'select',
        options: allRole.data.rows.map((v) => {
          return {
            ...v,
            label: v.role_name,
            value: v.id,
          };
        }),
        label: '父级角色',
        placeholder: '请选择父级角色',
      },
      {
        field: 'role_name',
        type: 'input',
        label: '角色名称',
        placeholder: '请输入角色名称',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'role_value',
        type: 'input',
        label: '角色标识',
        placeholder: '请输入角色标识',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'type',
        type: 'radio',
        label: '角色类型',
        placeholder: '请选择角色类型',
        options: [
          { label: '默认角色', value: 1 },
          { label: '自定义', value: 2 },
        ],
      },
      {
        field: 'priority',
        type: 'number',
        label: '角色权重',
        placeholder: '请输入角色权重',
      },
    ],
  };
};
