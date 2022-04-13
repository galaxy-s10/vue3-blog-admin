<template>
  <div>
    <n-button @click="handleAssginRole">批量新增角色</n-button>
    <n-data-table
      ref="table"
      remote
      :loading="tableLoading"
      :columns="columns"
      :data="roleData"
      :pagination="pagination"
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
      <div v-if="modalType !== ModalTypeEnum.ASSING">
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
          <!-- <n-form-item label="子角色" path="c_roles">
            <n-tree
              style="width: 100%"
              checkable
              cascade
              :data="childRoleData"
              :default-checked-keys="formValue.c_roles"
              key-field="id"
              label-field="role_value"
              children-field="children"
              check-strategy="parent"
              selectable
              @update:checked-keys="updateCheckedKeys"
            />
          </n-form-item> -->
          <!-- <n-form-item label="角色权限" path="role_auths">
            <n-tree
              style="width: 100%"
              checkable
              cascade
              :data="authTreeList"
              :default-checked-keys="formValue.role_auths"
              key-field="id"
              label-field="auth_description"
              children-field="children"
              selectable
              @update:checked-keys="updateCheckedKeys"
            />
          </n-form-item> -->
        </n-form>
      </div>
      <div v-else>
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
            />
          </n-form-item>
          <n-form-item label="子角色" path="c_roles">
            <n-tree
              style="width: 100%"
              checkable
              cascade
              :data="childRoleData"
              :default-checked-keys="formValue.c_roles"
              key-field="id"
              label-field="role_name"
              children-field="children"
              check-strategy="child"
              selectable
              @update:checked-keys="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
        ps:给角色新增的子角色需要是同一个父级
      </div>
    </HModal>
  </div>
</template>

<script lang="ts">
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref, watch, reactive } from 'vue';

import type { DataTableColumns, FormInst } from 'naive-ui';

import { fetchAuthList } from '@/api/auth';
import {
  fetchRoleList,
  fetchTreeRole,
  fetchTreeChildRole,
  fetchSetAddChildRole,
  fetchAllChildRole,
  fetchRoleAuth,
  fetchAllList,
  fetchUpdateRole,
  fetchCreateRole,
  fetchDeleteRole,
} from '@/api/role';
import HModal from '@/components/HModal/index.vue';
import { IRole, ModalTypeEnum } from '@/interface';

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
    let modalType = ref<ModalTypeEnum>(ModalTypeEnum.ADD);
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

    const handleAssginRole = async () => {
      const treeRole = await fetchTreeChildRole(); //子角色树
      const allRole = await fetchAllList(); //父级角色下拉框
      childRoleData.value = treeRole.data;
      selectList.value = allRole.data.rows.map((v) => {
        return {
          ...v,
          label: v.role_name,
          value: v.id,
        };
      });
      modalType.value = ModalTypeEnum.ASSING;
      modalTitle.value = '批量新增角色';
      modalVisiable.value = true;
    };

    const setAddChildRole = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchSetAddChildRole({
          id: formValue.value.id,
          c_roles: formValue.value.c_roles,
        });
        modalVisiable.value = false;
        window.$message.success('修改成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
      }
    };

    const paginationReactive = reactive({
      page: 0, //当前页
      itemCount: 0, //总条数
      pageSize: 0, //分页大小
      prefix() {
        return `一共${total.value}条数据`;
      },
    });

    /** ajaxfetchRoleList */
    const ajaxFetchRoleList = async (params) => {
      try {
        tableLoading.value = true;
        const res: any = await fetchTreeRole();
        if (res.code === 200) {
          tableLoading.value = false;
          roleData.value = res.data.rows;
          total.value = res.data.total;
          paginationReactive.page = params.nowPage;
          paginationReactive.itemCount = res.data.total;
          paginationReactive.pageSize = params.pageSize;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };

    /** ajaxFetchTreeRole */
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
      await ajaxFetchRoleList(params);
      await ajaxFetchTreeRole();
    });

    const handlePageChange = async (currentPage) => {
      await ajaxFetchRoleList({ ...params, nowPage: currentPage });
    };
    const createColumns = (): DataTableColumns<IRole> => {
      return [
        {
          title: 'id',
          key: 'id',
          align: 'center',
        },
        {
          title: '角色名称',
          key: 'role_name',
          align: 'center',
        },
        {
          title: '角色标识',
          key: 'role_value',
          align: 'center',
        },
        {
          title: '角色类型',
          key: 'type',
          align: 'center',
          render(row) {
            return row.type === 1 ? '默认角色' : '自定义';
          },
        },
        {
          title: '角色权重',
          key: 'priority',
          align: 'center',
        },
        {
          title: 'p_id',
          key: 'p_id',
          align: 'center',
        },
        {
          title: '操作',
          key: 'actions',
          width: '200',
          align: 'center',
          render(row) {
            return h(NSpace, {}, () => [
              h(
                NButton,
                {
                  size: 'small',
                  onClick: async () => {
                    const allRole = await fetchAllList(); //父级角色下拉框
                    modalTitle.value = '编辑角色';
                    modalType.value = ModalTypeEnum.EDIT;
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
                    modalType.value = ModalTypeEnum.ADD;
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
                  default: () => '确定删除吗',
                }
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
          priority: Number(formValue.value.priority || 0),
        });
        modalVisiable.value = false;
        window.$message.success('修改成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange(1);
        ajaxFetchTreeRole();
      }
    };

    const create = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchCreateRole({
          ...formValue.value,
          priority: Number(formValue.value.priority || 0),
        });
        modalVisiable.value = false;
        window.$message.success('新增成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange(1);
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
        handlePageChange(1);
        ajaxFetchTreeRole();
      }
    };

    const modalConfirm = () => {
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          switch (modalType.value) {
            case ModalTypeEnum.ADD:
              create();
              break;
            case ModalTypeEnum.EDIT:
              update();
              break;
            case ModalTypeEnum.ASSING:
              setAddChildRole();
              break;
            default:
              window.$message.success('错误的操作!');
              break;
          }
        }
      });
    };
    const modalCancel = () => {
      modalVisiable.value = false;
    };
    const updateCheckedKeys = (keys) => {
      console.log(keys, 33);
      defaultCheckedKeys.value = keys;
      formValue.value.c_roles = keys;
    };
    return {
      ModalTypeEnum,
      roleTypes,
      handleAssginRole,
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
      pagination: paginationReactive,
      rules,
      selectList,
      modalType,
      isAssignRole,
      roleTreeList,
      childRoleData,
    };
  },
});
</script>

<style lang="scss" scoped></style>
