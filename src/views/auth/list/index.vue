<template>
  <div>
    <n-data-table
      ref="table"
      remote
      :loading="tableLoading"
      :columns="columns"
      :data="authData"
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
          <n-form-item label="父级权限" path="p_id">
            <n-select
              v-model:value="formValue.p_id"
              clearable
              :options="selectList"
              :disabled="!isEdit || formValue.p_id === 0"
            />
          </n-form-item>
          <n-form-item label="权限名称" path="auth_name">
            <n-input
              v-model:value="formValue.auth_name"
              placeholder="请输入权限名称"
            />
          </n-form-item>
          <n-form-item label="权限描述" path="auth_description">
            <n-input
              v-model:value="formValue.auth_description"
              placeholder="请输入权限描述"
            />
          </n-form-item>
        </n-form>
      </div>
    </HModal>
    <n-tree
      block-line
      cascade
      :data="authTreeList"
      key-field="id"
      label-field="auth_description"
      children-field="children"
      default-expand-all
    />
  </div>
</template>

<script lang="ts">
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref, watch, reactive } from 'vue';

import type { DataTableColumns, FormInst } from 'naive-ui';

import {
  fetchList,
  fetchAllList,
  fetchChildAuth,
  fetchTreeList,
  fetchUpdateAuth,
  fetchCreateAuth,
  fetchDeleteAuth,
} from '@/api/auth';
import HModal from '@/components/HModal/index.vue';

type ILog = {
  id: number;
  auth_name: string;
  auth_description: string;
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
  p_auth_name: {
    required: true,
    message: '请输入角色父级角色',
    trigger: ['input', 'blur', 'change'],
  },
  auth_name: {
    required: true,
    message: '请输入角色名称',
    trigger: ['input', 'blur'],
  },
  auth_description: {
    required: true,
    message: '请输入角色描述',
    trigger: ['input', 'blur'],
  },
  // auth_auths: {
  //   // required: true,
  //   message: '请选择角色权限',
  //   type: 'array',
  //   // trigger: ['input', 'blur', 'change'],
  // },
};
export default defineComponent({
  components: { HModal },
  setup() {
    let authData = ref([]);
    let authTreeList = ref([]);
    let checkedKeys = ref([]);
    let total = ref(0);
    let currentAuth = ref();
    let tableLoading = ref(false);
    let modalConfirmLoading = ref(false);
    let showModal = ref(false);
    let modalTitle = ref('');
    let selectList = ref([]);
    let isEdit = ref(false);
    let formValue = ref({
      id: -1,
      p_id: -1,
      auth_name: '',
      auth_description: '',
      // auth_auths: [],
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
        newVal === false && (currentAuth.value = undefined);
      }
    );

    const updateShow = (newVal, oldVal) => {
      console.log('updateShow', newVal, oldVal);
      showModal.value = newVal;
      newVal === false && (currentAuth.value = undefined);
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
          authData.value = res.data.rows;
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

    /** ajaxFetchTreeList */
    const ajaxFetchTreeList = async () => {
      try {
        const res: any = await fetchTreeList();
        if (res.code === 200) {
          authTreeList.value = res.data;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };

    onMounted(async () => {
      await ajaxFetchList(params);
      await ajaxFetchTreeList();
    });
    const handlePageChange = async (currentPage) => {
      await ajaxFetchList({ ...params, nowPage: currentPage });
    };
    const createColumns = (): DataTableColumns<ILog> => {
      return [
        {
          title: 'id',
          key: 'id',
          width: '100',
          align: 'center',
        },
        {
          title: '权限名称',
          key: 'auth_name',
          width: '100',
          align: 'center',
        },
        {
          title: '权限描述',
          key: 'auth_description',
          width: '100',
          align: 'center',
        },
        {
          title: 'p_id',
          key: 'p_id',
          width: '100',
          align: 'center',
        },
        {
          title: 'Action',
          key: 'actions',
          width: '100',
          align: 'center',
          render(row) {
            return h(NSpace, {}, () => [
              h(
                NButton,
                {
                  size: 'small',
                  onClick: async () => {
                    console.log('click', row);
                    const treeList = await fetchTreeList();
                    const allList = await fetchAllList();
                    modalTitle.value = '编辑角色';
                    isEdit.value = true;
                    authTreeList.value = treeList.data;
                    currentAuth.value = row;
                    formValue.value = { ...row };
                    showModal.value = !showModal.value;
                    selectList.value = allList.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.auth_description,
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
                    const treeList = await fetchTreeList();
                    const allList = await fetchAllList();
                    modalTitle.value = '新增角色';
                    isEdit.value = false;
                    authTreeList.value = treeList.data;
                    currentAuth.value = row;
                    formValue.value = {
                      id: -1,
                      p_id: row.id,
                      auth_name: '',
                      auth_description: '',
                    };
                    showModal.value = !showModal.value;
                    selectList.value = allList.data.rows.map((v) => {
                      return {
                        ...v,
                        label: v.auth_description,
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
        await fetchUpdateAuth(formValue.value);
        showModal.value = false;
        window.$message.success('修改成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange(1);
        ajaxFetchTreeList();
      }
    };

    const create = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchCreateAuth(formValue.value);
        showModal.value = false;
        window.$message.success('新增成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange(1);
        ajaxFetchTreeList();
      }
    };

    const deleteRole = async (id) => {
      try {
        modalConfirmLoading.value = true;
        await fetchDeleteAuth(id);
        showModal.value = false;
        window.$message.success('删除成功!');
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
        handlePageChange(1);
        ajaxFetchTreeList();
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
    };
    return {
      updateShow,
      handlePageChange,
      tableLoading,
      modalConfirmLoading,
      formValue,
      currentAuth,
      modalConfirm,
      updateCheckedKeys,
      modalCancel,
      checkedKeys,
      showModal,
      modalTitle,
      formRef,
      authData,
      columns: createColumns(),
      pagination: paginationReactive,
      rules,
      selectList,
      isEdit,
      authTreeList,
    };
  },
});
</script>

<style lang="scss" scoped></style>
