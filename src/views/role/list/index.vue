<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :loading="tableListLoading"
      :columns="columns"
      :data="tableListData"
      :pagination="pagination"
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
      <EditRoleAuth
        v-if="isEditAuth"
        ref="editRoleAuthRef"
        v-model="currRow"
        :show-action="false"
      ></EditRoleAuth>
      <AddRole
        v-else
        ref="addRoleRef"
        v-model="currRow"
        :show-action="false"
      ></AddRole>
    </HModal>
  </div>
</template>

<script lang="ts">
import { NButton, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref } from 'vue';

import {
  fetchRoleAuth,
  fetchRoleList,
  fetchUpdateRole,
  fetchUpdateRoleAuth,
} from '@/api/role';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IRole, IList } from '@/interface';

import AddRole from '../add/index.vue';
import EditRoleAuth from '../editRoleAuth/index.vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

import type { DataTableColumns } from 'naive-ui';
import type { TableColumn } from 'naive-ui/es/data-table/src/interface';

interface ISearch extends IRole, IList {}

export default defineComponent({
  components: { HSearch, HModal, AddRole, EditRoleAuth },
  setup() {
    const tableListData = ref([]);
    const total = ref(0);
    const isEditAuth = ref(false);
    const paginationReactive = usePage();

    const modalConfirmLoading = ref(false);
    const modalVisiable = ref(false);
    const modalTitle = ref('');
    const tableListLoading = ref(false);
    const currRow = ref({});
    const addRoleRef = ref<any>(null);
    const editRoleAuthRef = ref<any>(null);
    const params = ref<ISearch>({
      nowPage: 1,
      pageSize: 10,
      orderName: 'id',
      orderBy: 'desc',
    });
    const createColumns = (): DataTableColumns<IRole> => {
      const action: TableColumn<IRole> = {
        title: '操作',
        key: 'actions',
        width: 200,
        align: 'center',
        fixed: 'right',
        render(row) {
          return h(
            NSpace,
            {
              justify: 'center',
            },
            () => [
              h(
                NButton,
                {
                  size: 'small',
                  type: 'info',
                  onClick: async () => {
                    const { data } = await fetchRoleAuth(row.id!);
                    isEditAuth.value = true;
                    modalTitle.value = '编辑角色权限';
                    modalVisiable.value = true;
                    currRow.value = {
                      id: row.id,
                      role_auths: data.result.map((v: IRole) => v.id),
                    };
                  },
                },
                () => '编辑角色权限' // 用箭头函数返回性能更好。
              ),
              h(
                NButton,
                {
                  size: 'small',
                  type: 'primary',
                  onClick: () => {
                    isEditAuth.value = false;
                    modalTitle.value = '编辑角色';
                    modalVisiable.value = true;
                    currRow.value = { ...row };
                  },
                },
                () => '编辑' // 用箭头函数返回性能更好。
              ),
            ]
          );
        },
      };
      return [...columnsConfig(), action];
    };

    const ajaxFetchList = async (args) => {
      try {
        tableListLoading.value = true;
        const res: any = await fetchRoleList(args);
        if (res.code === 200) {
          tableListLoading.value = false;
          tableListData.value = res.data.rows;
          total.value = res.data.total;
          paginationReactive.page = args.nowPage;
          paginationReactive.itemCount = res.data.total;
          paginationReactive.pageSize = args.pageSize;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };

    onMounted(async () => {
      await ajaxFetchList(params.value);
    });

    const handlePageChange = async (currentPage) => {
      params.value.nowPage = currentPage;
      await ajaxFetchList({ ...params.value, nowPage: currentPage });
    };

    const handleSearch = (v) => {
      params.value = {
        ...params.value,
        ...v,
        nowPage: 1,
        pageSize: params.value.pageSize,
        rangTimeType: v.rangTimeType ? 'created_at' : undefined,
        rangTimeStart: v.rangTimeType ? v.rangTimeType[0] : undefined,
        rangTimeEnd: v.rangTimeType ? v.rangTimeType[1] : undefined,
      };
      handlePageChange(1);
    };

    const modalCancel = () => {
      modalVisiable.value = false;
    };

    const updateRole = async () => {
      try {
        modalConfirmLoading.value = true;
        const res = await addRoleRef.value.validateForm();
        await fetchUpdateRole({
          ...res,
          created_at: undefined,
          updated_at: undefined,
          deleted_at: undefined,
        });
        window.$message.success('更新成功!');
        modalVisiable.value = false;
        handlePageChange(params.value.nowPage);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
      }
    };
    const updateRoleAuth = async () => {
      try {
        modalConfirmLoading.value = true;
        const res = await editRoleAuthRef.value.validateForm();
        await fetchUpdateRoleAuth({
          id: res.id,
          role_auths: res.role_auths,
        });
        window.$message.success('更新成功!');
        modalVisiable.value = false;
        handlePageChange(params.value.nowPage);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
      }
    };

    const modalConfirm = () => {
      if (isEditAuth.value) {
        updateRoleAuth();
      } else {
        updateRole();
      }
    };

    const modalUpdateShow = (newVal) => {
      modalVisiable.value = newVal;
    };

    return {
      isEditAuth,
      modalConfirmLoading,
      modalVisiable,
      modalTitle,
      modalConfirm,
      modalCancel,
      modalUpdateShow,
      handlePageChange,
      handleSearch,
      currRow,
      addRoleRef,
      editRoleAuthRef,
      tableListData,
      tableListLoading,
      columns: createColumns(),
      pagination: paginationReactive,
      searchFormConfig,
      params,
    };
  },
});
</script>

<style lang="scss" scoped></style>
