<template>
  <div>
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
      v-model:show="showModal"
      :title="modalTitle"
      :loading="modalConfirmLoading"
      @update:show="updateShow"
      @confirm="modalConfirm"
      @cancel="modalCancel"
    >
      <div>
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
              :disabled="!isEdit || formValue.p_id === 0"
            />
          </n-form-item>
          <n-form-item label="角色名称" path="role_name">
            <n-input
              v-model:value="formValue.role_name"
              placeholder="请输入角色名称"
            />
          </n-form-item>
          <n-form-item label="角色描述" path="role_description">
            <n-input
              v-model:value="formValue.role_description"
              placeholder="请输入角色描述"
            />
          </n-form-item>
          <n-form-item label="角色权限" path="role_auths">
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
          </n-form-item>
        </n-form>
      </div>
    </HModal>
    <n-tree
      block-line
      cascade
      :data="roleTreeList"
      key-field="id"
      label-field="role_description"
      children-field="children"
      default-expand-all
    />
  </div>
</template>

<script lang="ts">
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref, watch, reactive } from 'vue';

import type { DataTableColumns, FormInst } from 'naive-ui';

import { fetchTreeList } from '@/api/auth';
import {
  fetchList,
  fetchTreeList as fetchRoleTreeList,
  fetchRoleAuth,
  fetchAllList,
  fetchUpdateRole,
  fetchCreateRole,
  fetchDeleteRole,
} from '@/api/role';
import HModal from '@/components/HModal/index.vue';

type IProp = {
  id: number;
  role_name: string;
  role_description: string;
  p_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
};
const rules = {
  p_id: {
    required: true,
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
  role_description: {
    required: true,
    message: '请输入角色描述',
    trigger: ['input', 'blur'],
  },
  role_auths: {
    // required: true,
    message: '请选择角色权限',
    type: 'array',
    // trigger: ['input', 'blur', 'change'],
  },
};

export default defineComponent({
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
    let showModal = ref(false);
    let modalTitle = ref('');
    let selectList = ref([]);
    let roleTreeList = ref([]);
    let isEdit = ref(false);
    let formValue = ref({
      id: -1,
      p_id: -1,
      role_name: '',
      role_description: '',
      role_auths: [],
    });
    const formRef = ref<FormInst | null>(null);

    const params = reactive({
      nowPage: 1,
      pageSize: 10,
      orderBy: 'asc',
      orderName: 'id',
    });

    watch(
      () => showModal.value,
      (newVal) => {
        newVal === false && (currentRole.value = undefined);
      }
    );

    const updateShow = (newVal, oldVal) => {
      console.log('updateShow', newVal, oldVal);
      showModal.value = newVal;
      newVal === false && (currentRole.value = undefined);
    };

    const paginationReactive = reactive({
      page: 0, //当前页
      itemCount: 0, //总条数
      pageSize: 0, //分页大小
      prefix() {
        return `一共${total.value}条数据`;
      },
    });

    /** ajaxfetchList */
    const ajaxFetchList = async (params) => {
      try {
        tableLoading.value = true;
        const res: any = await fetchList(params);
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

    /** ajaxFetchRoleTreeList */
    const ajaxFetchRoleTreeList = async () => {
      try {
        const res: any = await fetchRoleTreeList();
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
      await ajaxFetchList(params);
      await ajaxFetchRoleTreeList();
    });
    const handlePageChange = async (currentPage) => {
      await ajaxFetchList({ ...params, nowPage: currentPage });
    };
    const createColumns = (): DataTableColumns<IProp> => {
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
          title: '角色描述',
          key: 'role_description',
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
                    console.log('click', row);
                    const allAuth = await fetchTreeList();
                    const allRole = await fetchAllList();
                    const auth = await fetchRoleAuth(row.id);
                    const role_auths = auth.data.map((v) => v.id);
                    modalTitle.value = '编辑角色';
                    isEdit.value = true;
                    authTreeList.value = allAuth.data;
                    defaultCheckedKeys.value = role_auths;
                    currentRole.value = row;
                    formValue.value = { ...row, role_auths };
                    showModal.value = !showModal.value;
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.role_description,
                        value: v.id,
                      };
                    });
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
                    console.log('click', row);
                    const allAuth = await fetchTreeList();
                    const allRole = await fetchAllList();
                    const auth = await fetchRoleAuth(row.id);
                    const role_auths = auth.data.map((v) => v.id);
                    modalTitle.value = '新增角色';
                    isEdit.value = false;
                    authTreeList.value = allAuth.data;
                    defaultCheckedKeys.value = role_auths;
                    currentRole.value = row;
                    formValue.value = {
                      id: -1,
                      p_id: row.id,
                      role_name: '',
                      role_description: '',
                      role_auths: [],
                    };
                    showModal.value = !showModal.value;
                    selectList.value = allRole.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.role_description,
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
        await fetchUpdateRole(formValue.value);
        showModal.value = false;
        window.$message.success('修改成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange(1);
        ajaxFetchRoleTreeList();
      }
    };

    const create = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchCreateRole(formValue.value);
        showModal.value = false;
        window.$message.success('新增成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange(1);
        ajaxFetchRoleTreeList();
      }
    };

    const deleteRole = async (id) => {
      try {
        modalConfirmLoading.value = true;
        await fetchDeleteRole(id);
        showModal.value = false;
        window.$message.success('删除成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange(1);
        ajaxFetchRoleTreeList();
      }
    };

    const modalConfirm = async () => {
      console.log('=====');
      if (isEdit.value) {
        await update();
      } else {
        await create();
      }
    };
    const modalCancel = () => {
      showModal.value = false;
      console.log('first');
    };
    const updateCheckedKeys = (keys) => {
      console.log('updateCheckedKeys', keys);
      defaultCheckedKeys.value = keys;
      formValue.value.role_auths = keys;
    };
    return {
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
      showModal,
      modalTitle,
      formRef,
      roleData,
      columns: createColumns(),
      pagination: paginationReactive,
      rules,
      selectList,
      isEdit,
      roleTreeList,
    };
  },
});
</script>

<style lang="scss" scoped></style>
