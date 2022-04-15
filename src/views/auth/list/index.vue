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
      @update:show="modalUpdateShow"
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
          <n-form-item label="父级权限" path="p_id">
            <n-select
              v-model:value="formValue.p_id"
              clearable
              :options="selectList"
              :disabled="!modalType || formValue.p_id === 0"
            />
          </n-form-item>
          <n-form-item label="权限名称" path="auth_name">
            <n-input
              v-model:value="formValue.auth_name"
              placeholder="请输入权限名称"
            />
          </n-form-item>
          <n-form-item label="权限标识" path="auth_value">
            <n-input
              v-model:value="formValue.auth_value"
              placeholder="请输入权限标识"
            />
          </n-form-item>
          <n-form-item label="权限类型" path="type">
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
          <n-form-item label="权限权重" path="priority">
            <n-input
              v-model:value="formValue.priority"
              type="number"
              placeholder="请输入权限权重"
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
          <n-form-item label="权限" path="id">
            <n-select
              v-model:value="formValue.id"
              clearable
              :options="selectList"
              disabled
            />
          </n-form-item>
          <n-form-item label="子权限" path="c_auths">
            <n-tree
              style="width: 100%"
              checkable
              cascade
              selectable
              :data="childRoleData"
              :default-checked-keys="formValue.c_auths"
              key-field="id"
              label-field="auth_name"
              children-field="children"
              @update:checked-keys="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
        <p>注意：会删除选中的权限以及它关联的所有权限</p>
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
          <n-form-item label="权限" path="id">
            <n-select
              v-model:value="formValue.id"
              clearable
              :options="selectList"
              disabled
            />
          </n-form-item>
          <n-form-item label="子权限" path="c_auths">
            <n-tree-select
              multiple
              cascade
              checkable
              check-strategy="child"
              :options="batchAddOptions"
              key-field="id"
              label-field="auth_name"
              children-field="children"
              @update:value="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
        <p>注意1：每次新增的子权限需要是同一个父级（但不是同一个祖先）。</p>
        <p>
          注意2：这里的新增其实并不是新增，而是修改当前的选中的权限的父级权限。
        </p>
      </div>
    </HModal>
  </div>
</template>

<script lang="ts">
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref } from 'vue';

import type { DataTableColumns, FormInst } from 'naive-ui';

import {
  fetchTreeAuth,
  fetchGetChildAuth,
  fetchAllChildAuth,
  fetchAllList,
  fetchUpdateAuth,
  fetchCreateAuth,
  fetchDeleteAuth,
  fetchBatchDeleteChildAuths,
  fetchBatchAddChildAuths,
} from '@/api/auth';
import HModal from '@/components/Base/Modal';
import { IAuth, modalTypeEnum } from '@/interface';
import { deepCloneByJson } from '@/utils';

const rules = {
  p_id: {
    // required: true,
    type: 'number',
    message: '请选择父级权限',
    trigger: ['input'],
  },
  p_auth_name: {
    required: true,
    message: '请输入权限父级权限',
    trigger: ['input', 'blur', 'change'],
  },
  auth_name: {
    required: true,
    message: '请输入权限名称',
    trigger: ['input', 'blur'],
  },
  auth_value: {
    required: true,
    message: '请输入权限标识',
    trigger: ['input', 'blur'],
  },
  type: {
    message: '请选择权限类型',
    type: 'number',
    trigger: ['input', 'blur'],
  },
  priority: {
    require: false,
    message: '请输入权限权重',
    trigger: ['input'],
  },
  auth_auths: {
    // required: true,
    message: '请选择权限权限',
    type: 'array',
    // trigger: ['input', 'blur', 'change'],
  },
};

export default defineComponent({
  name: 'RoleList',
  components: { HModal },
  setup() {
    let roleData = ref([]);
    let total = ref(0);
    let tableLoading = ref(false);
    let modalConfirmLoading = ref(false);
    let modalVisiable = ref(false);
    let modalTitle = ref('');
    let modalType = ref<modalTypeEnum>(modalTypeEnum.ADD);

    let selectList = ref([]);
    let childRoleData = ref([]);
    let batchAddOptions = ref([]);
    let roleTypes = ref([
      {
        value: 1,
        label: '默认权限',
      },
      {
        value: 2,
        label: '自定义',
      },
    ]);

    let formValue = ref<IAuth>({
      id: 1,
      p_id: 0,
      auth_name: '',
      auth_value: '',
      type: 1,
      priority: 1,
      c_auths: [],
    });
    const formRef = ref<FormInst | null>(null);

    const modalUpdateShow = (newVal) => {
      modalVisiable.value = newVal;
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

    const ajaxFetchRoleList = async () => {
      try {
        tableLoading.value = true;
        const res: any = await fetchTreeAuth(1);
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

    onMounted(async () => {
      await ajaxFetchRoleList();
    });

    const handlePageChange = async () => {
      await ajaxFetchRoleList();
    };
    const createColumns = (): DataTableColumns<IAuth> => {
      return [
        {
          title: 'id',
          key: 'id',
          width: 200,
          align: 'center',
        },
        {
          title: '权限名称',
          key: 'auth_name',
          width: 200,
          align: 'center',
        },
        {
          title: '权限标识',
          key: 'auth_value',
          width: 200,
          align: 'center',
        },
        {
          title: '权限类型',
          key: 'type',
          align: 'center',
          width: 200,
          render(row) {
            return row.type === 1 ? '默认权限' : '自定义';
          },
        },
        {
          title: '权限权重',
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
                    const allRole = await fetchAllList(); //父级权限下拉框
                    modalTitle.value = '编辑权限';
                    modalType.value = modalTypeEnum.EDIT;
                    formValue.value = {
                      ...row,
                      priority: row.priority + '',
                    };
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.auth_name,
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
                    const allRole = await fetchAllList(); //父级权限下拉框
                    modalTitle.value = '新增权限';
                    modalType.value = modalTypeEnum.ADD;
                    Object.keys(formValue.value).forEach((v) => {
                      formValue.value[v] = undefined;
                    });
                    formValue.value.p_id = row.id;
                    modalVisiable.value = !modalVisiable.value;
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.auth_name,
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
                  default: () => '会删除底下关联的所有子权限，确定吗?',
                }
              ),
              h(
                NButton,
                {
                  size: 'small',
                  type: 'info',
                  onClick: async () => {
                    const treeRole = await fetchGetChildAuth(row.id!); //子权限树
                    const allRole = await fetchAllList(); //父级权限下拉框
                    childRoleData.value = treeRole.data.result;
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.auth_name,
                        value: v.id,
                      };
                    });
                    formValue.value.id = row.id;
                    modalTitle.value = '批量删除子权限';
                    modalType.value = modalTypeEnum.BATCH_DELETE;
                    modalVisiable.value = true;
                  },
                },
                () => '批量删除子权限' //用箭头函数返回性能更好。
              ),
              h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: async () => {
                    const allChildRole = await fetchAllChildAuth(row.id!); //子权限树
                    const allChildRoleIds = [
                      row.id,
                      ...allChildRole.data.result.map((v) => v.id),
                    ];
                    const allRole = await fetchAllList(); //父级权限下拉框
                    // 递归禁用已有的权限
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
                    batchAddOptions.value = disableRole(
                      deepCloneByJson(roleData.value)
                    );
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.auth_name,
                        value: v.id,
                      };
                    });
                    formValue.value.id = row.id;
                    modalTitle.value = '批量新增子权限';
                    modalType.value = modalTypeEnum.BATCH_ADD;
                    modalVisiable.value = true;
                  },
                },
                () => '批量新增子权限' //用箭头函数返回性能更好。
              ),
            ]);
          },
        },
      ];
    };

    const update = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchUpdateAuth({
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
      }
    };

    const create = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchCreateAuth({
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
      }
    };

    const deleteRole = async (id) => {
      try {
        modalConfirmLoading.value = true;
        const { message } = await fetchDeleteAuth(id);
        modalVisiable.value = false;
        window.$message.success(message);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange();
      }
    };

    const batchDeleteChildRoles = async () => {
      try {
        modalConfirmLoading.value = true;
        const { message } = await fetchBatchDeleteChildAuths({
          id: formValue.value.id,
          c_auths: formValue.value.c_auths,
        });
        modalVisiable.value = false;
        window.$message.success(message);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange();
      }
    };

    const batchAddChildRoles = async () => {
      try {
        modalConfirmLoading.value = true;
        const { message } = await fetchBatchAddChildAuths({
          id: formValue.value.id,
          c_auths: formValue.value.c_auths,
        });
        modalVisiable.value = false;
        window.$message.success(message);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange();
      }
    };

    const updateCheckedKeys = (keys) => {
      formValue.value.c_auths = keys;
    };
    return {
      handlePageChange,
      updateCheckedKeys,
      tableLoading,
      modalConfirmLoading,
      modalType,
      modalTypeEnum,
      modalVisiable,
      modalTitle,
      modalConfirm,
      modalCancel,
      modalUpdateShow,
      formValue,
      formRef,
      roleTypes,
      roleData,
      columns: createColumns(),
      rules,
      selectList,
      childRoleData,
      batchAddOptions,
    };
  },
});
</script>

<style lang="scss" scoped></style>
