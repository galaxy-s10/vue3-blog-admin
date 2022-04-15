<template>
  <div>
    <n-data-table
      ref="table"
      remote
      :row-key="(row) => row.id"
      :loading="tableLoading"
      :columns="columns"
      :data="roleData"
      :bordered="false"
      @update:page="handlePageChange"
    />

    <HModal
      v-model:show="modalVisiable"
      :title="modalTitle"
      :loading="modalConfirmLoading"
      @update:show="updateShow"
      @confirm="modalConfirm"
      @cancel="modalCancel"
    >
      <div
        v-if="
          modalType === modalTypeEnum.ADD || modalType === modalTypeEnum.EDIT
        "
      >
        <n-form
          ref="formRef"
          :inline="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item label="父级角色" path="p_id">
            <n-select
              v-model:value="formValue.p_id"
              clearable
              :options="selectList"
              :disabled="!modalType || formValue.p_id === 0"
            />
          </n-form-item>
          <n-form-item label="角色名称" path="role_name">
            <n-input
              v-model:value="formValue.role_name"
              placeholder="请输入角色名称"
            />
          </n-form-item>
          <n-form-item label="角色标识" path="role_value">
            <n-input
              v-model:value="formValue.role_value"
              placeholder="请输入角色标识"
            />
          </n-form-item>
          <n-form-item label="角色类型" path="type">
            <n-radio-group v-model:value="formValue.type" name="radiogroup">
              <n-space>
                <n-radio
                  v-for="item in roleTypes"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="角色权重" path="priority">
            <n-input
              v-model:value="formValue.priority"
              type="number"
              placeholder="请输入角色权重"
            />
          </n-form-item>
        </n-form>
      </div>
      <div v-else-if="modalType === modalTypeEnum.BATCH_DELETE">
        <n-form
          ref="formRef"
          :inline="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item label="角色" path="id">
            <n-select
              v-model:value="formValue.id"
              clearable
              :options="selectList"
              disabled
            />
          </n-form-item>
          <n-form-item label="子角色" path="c_roles">
            <n-tree
              style="width: 100%"
              checkable
              cascade
              selectable
              :data="childRoleData"
              :default-checked-keys="formValue.c_roles"
              key-field="id"
              label-field="role_name"
              children-field="children"
              @update:checked-keys="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
        <p>注意：会删除选中的角色以及它关联的所有角色</p>
      </div>
      <div v-else-if="modalType === modalTypeEnum.BATCH_ADD">
        <n-form
          ref="formRef"
          :inline="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item label="角色" path="id">
            <n-select
              v-model:value="formValue.id"
              clearable
              :options="selectList"
              disabled
            />
          </n-form-item>
          <n-form-item label="子角色" path="c_roles">
            <n-tree-select
              multiple
              cascade
              checkable
              check-strategy="child"
              :options="batchAddOptions"
              key-field="id"
              label-field="role_name"
              children-field="children"
              @update:value="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
        <p>注意1：每次新增的子角色需要是同一个父级（但不是同一个祖先）。</p>
        <p>
          注意2：这里的新增其实并不是新增，而是修改当前的选中的角色的父级角色。
        </p>
      </div>
    </HModal>
  </div>
</template>

<script lang="ts">
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref, watch, reactive } from 'vue';

import type { DataTableColumns, FormInst } from 'naive-ui';

import {
  fetchTreeRole,
  fetchGetChildRole,
  fetchAllChildRole,
  fetchAllList,
  fetchUpdateRole,
  fetchCreateRole,
  fetchDeleteRole,
  fetchBatchDeleteChildRoles,
  fetchBatchAddChildRoles,
} from '@/api/role';
import HModal from '@/components/Base/Modal';
import { IRole, modalTypeEnum } from '@/interface';
import { deepCloneByJson } from '@/utils';

const rules = {
  p_id: {
    // required: true,
    type: 'number',
    message: '请选择父级角色',
    trigger: ['input'],
  },
  p_role_name: {
    required: true,
    message: '请输入角色父级角色',
    trigger: ['input', 'blur', 'change'],
  },
  role_name: {
    required: true,
    message: '请输入角色名称',
    trigger: ['input', 'blur'],
  },
  role_value: {
    required: true,
    message: '请输入角色标识',
    trigger: ['input', 'blur'],
  },
  type: {
    message: '请选择角色类型',
    type: 'number',
    trigger: ['input', 'blur'],
  },
  priority: {
    require: false,
    message: '请输入角色权重',
    trigger: ['input'],
  },
  role_auths: {
    // required: true,
    message: '请选择角色权限',
    type: 'array',
    // trigger: ['input', 'blur', 'change'],
  },
};

export default defineComponent({
  name: 'RoleList',
  components: { HModal },
  setup() {
    let roleData = ref([]);
    let authTreeList = ref([]);
    let checkedKeys = ref([]);
    let defaultCheckedKeys = ref([]);
    let total = ref(0);
    let currentRole = ref();
    let tableLoading = ref(false);
    let modalConfirmLoading = ref(false);
    let modalVisiable = ref(false);
    let modalTitle = ref('');
    let selectList = ref([]);
    let roleTreeList = ref([]);
    let childRoleData = ref([]);
    let batchAddOptions = ref([]);
    let roleTypes = ref([
      {
        value: 1,
        label: '默认角色',
      },
      {
        value: 2,
        label: '自定义',
      },
    ]);
    let modalType = ref<modalTypeEnum>(modalTypeEnum.ADD);
    let isAssignRole = ref(false);

    let formValue = ref<IRole>({
      id: 1,
      p_id: 0,
      role_name: '',
      role_value: '',
      type: 1,
      priority: 1,
      role_auths: [],
      c_roles: [],
    });
    const formRef = ref<FormInst | null>(null);

    const params = reactive({
      nowPage: 1,
      pageSize: 10,
      orderBy: 'asc',
      orderName: 'id',
    });

    watch(
      () => modalVisiable.value,
      (newVal) => {
        newVal === false && (currentRole.value = undefined);
      }
    );

    const updateShow = (newVal) => {
      modalVisiable.value = newVal;
      newVal === false && (currentRole.value = undefined);
    };

    const ajaxFetchRoleList = async () => {
      try {
        tableLoading.value = true;
        const res: any = await fetchTreeRole(1);
        if (res.code === 200) {
          tableLoading.value = false;
          roleData.value = res.data;
          total.value = res.data.total;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };

    const ajaxFetchTreeRole = async () => {
      try {
        const res: any = await fetchTreeRole();
        if (res.code === 200) {
          roleTreeList.value = res.data;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };

    onMounted(async () => {
      await ajaxFetchRoleList();
      await ajaxFetchTreeRole();
    });

    const handlePageChange = async () => {
      await ajaxFetchRoleList();
    };
    const createColumns = (): DataTableColumns<IRole> => {
      return [
        {
          title: 'id',
          key: 'id',
          width: 200,
          align: 'center',
        },
        {
          title: '角色名称',
          key: 'role_name',
          width: 200,
          align: 'center',
        },
        {
          title: '角色标识',
          key: 'role_value',
          width: 200,
          align: 'center',
        },
        {
          title: '角色类型',
          key: 'type',
          align: 'center',
          width: 200,
          render(row) {
            return row.type === 1 ? '默认角色' : '自定义';
          },
        },
        {
          title: '角色权重',
          key: 'priority',
          width: 100,
          align: 'center',
        },
        {
          title: 'p_id',
          key: 'p_id',
          width: 100,
          align: 'center',
        },
        {
          title: '操作',
          key: 'actions',
          width: 500,
          align: 'center',
          fixed: 'right',
          render(row) {
            return h(NSpace, { justify: 'center' }, () => [
              h(
                NButton,
                {
                  size: 'small',
                  onClick: async () => {
                    const allRole = await fetchAllList(); //父级角色下拉框
                    modalTitle.value = '编辑角色';
                    modalType.value = modalTypeEnum.EDIT;
                    formValue.value = {
                      ...row,
                      priority: row.priority + '',
                    };
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.role_name,
                        value: v.id,
                      };
                    });
                    modalVisiable.value = !modalVisiable.value;
                  },
                },
                () => '编辑' //用箭头函数返回性能更好。
              ),
              h(
                NButton,
                {
                  size: 'small',
                  type: 'primary',
                  onClick: async () => {
                    const allRole = await fetchAllList(); //父级角色下拉框
                    modalTitle.value = '新增角色';
                    modalType.value = modalTypeEnum.ADD;
                    currentRole.value = { ...row };
                    Object.keys(formValue.value).forEach((v) => {
                      formValue.value[v] = undefined;
                    });
                    formValue.value.p_id = row.id;
                    modalVisiable.value = !modalVisiable.value;
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.role_name,
                        value: v.id,
                      };
                    });
                  },
                },
                () => '新增' //用箭头函数返回性能更好。
              ),
              h(
                NPopconfirm,
                {
                  'positive-text': '确定',
                  'negative-text': '取消',
                  'on-positive-click': () => {
                    deleteRole(row.id);
                  },
                  'on-negative-click': () => {
                    window.$message.info('已取消!');
                  },
                },
                {
                  trigger: () =>
                    h(
                      NButton,
                      {
                        size: 'small',
                        type: 'error',
                      },
                      () => '删除' //用箭头函数返回性能更好。
                    ),
                  default: () => '会删除底下关联的所有子角色，确定吗?',
                }
              ),
              h(
                NButton,
                {
                  size: 'small',
                  type: 'info',
                  onClick: async () => {
                    const treeRole = await fetchGetChildRole(row.id!); //子角色树
                    const allRole = await fetchAllList(); //父级角色下拉框
                    childRoleData.value = treeRole.data.result;
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.role_name,
                        value: v.id,
                      };
                    });
                    formValue.value.id = row.id;
                    modalTitle.value = '批量删除子角色';
                    modalType.value = modalTypeEnum.BATCH_DELETE;
                    modalVisiable.value = true;
                  },
                },
                () => '批量删除子角色' //用箭头函数返回性能更好。
              ),
              h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: async () => {
                    const allChildRole = await fetchAllChildRole(row.id!); //子角色树
                    const allChildRoleIds = [
                      row.id,
                      ...allChildRole.data.result.map((v) => v.id),
                    ];
                    const allRole = await fetchAllList(); //父级角色下拉框
                    // 递归禁用已有的角色
                    const disableRole = (data) => {
                      console.log(data, 32);
                      data.forEach((v) => {
                        console.log(v, 23223, allChildRoleIds.includes(v.id));
                        if (allChildRoleIds.includes(v.id)) {
                          v.disabled = true;
                        }
                        console.log(v.children);
                        if (v.children) {
                          disableRole(v.children);
                        }
                      });
                      return data;
                    };
                    // console.log(
                    //   disableRole(deepCloneByJson(roleData.value)),
                    //   999
                    // );
                    batchAddOptions.value = disableRole(
                      deepCloneByJson(roleData.value)
                    );
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.role_name,
                        value: v.id,
                      };
                    });
                    formValue.value.id = row.id;
                    modalTitle.value = '批量新增子角色';
                    modalType.value = modalTypeEnum.BATCH_ADD;
                    modalVisiable.value = true;
                  },
                },
                () => '批量新增子角色' //用箭头函数返回性能更好。
              ),
            ]);
          },
        },
      ];
    };

    const update = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchUpdateRole({
          ...formValue.value,
          priority: Number(formValue.value.priority || 1),
        });
        modalVisiable.value = false;
        window.$message.success('修改成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange();
        ajaxFetchTreeRole();
      }
    };

    const create = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchCreateRole({
          ...formValue.value,
          priority: Number(formValue.value.priority || 1),
        });
        modalVisiable.value = false;
        window.$message.success('新增成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange();
        ajaxFetchTreeRole();
      }
    };

    const deleteRole = async (id) => {
      try {
        modalConfirmLoading.value = true;
        const { message } = await fetchDeleteRole(id);
        modalVisiable.value = false;
        window.$message.success(message);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange();
        ajaxFetchTreeRole();
      }
    };

    const batchDeleteChildRoles = async () => {
      try {
        modalConfirmLoading.value = true;
        const { message } = await fetchBatchDeleteChildRoles({
          id: formValue.value.id,
          c_roles: formValue.value.c_roles,
        });
        modalVisiable.value = false;
        window.$message.success(message);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange();
        ajaxFetchTreeRole();
      }
    };

    const batchAddChildRoles = async () => {
      try {
        modalConfirmLoading.value = true;
        const { message } = await fetchBatchAddChildRoles({
          id: formValue.value.id,
          c_roles: formValue.value.c_roles,
        });
        modalVisiable.value = false;
        window.$message.success(message);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange();
        ajaxFetchTreeRole();
      }
    };

    const modalConfirm = () => {
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          switch (modalType.value) {
            case modalTypeEnum.ADD:
              create();
              break;
            case modalTypeEnum.EDIT:
              update();
              break;
            case modalTypeEnum.BATCH_DELETE:
              batchDeleteChildRoles();
              break;
            case modalTypeEnum.BATCH_ADD:
              batchAddChildRoles();
              break;
            default:
              window.$message.warning('错误的操作!');
              break;
          }
        }
      });
    };
    const modalCancel = () => {
      modalVisiable.value = false;
    };
    const updateCheckedKeys = (keys) => {
      defaultCheckedKeys.value = keys;
      formValue.value.c_roles = keys;
    };
    return {
      modalTypeEnum,
      roleTypes,
      updateShow,
      handlePageChange,
      tableLoading,
      modalConfirmLoading,
      formValue,
      currentRole,
      modalConfirm,
      updateCheckedKeys,
      modalCancel,
      authTreeList,
      defaultCheckedKeys,
      checkedKeys,
      modalVisiable,
      modalTitle,
      formRef,
      roleData,
      columns: createColumns(),
      rules,
      selectList,
      modalType,
      isAssignRole,
      roleTreeList,
      childRoleData,
      batchAddOptions,
    };
  },
});
</script>

<style lang="scss" scoped></style>
