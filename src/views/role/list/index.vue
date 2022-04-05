<template>
  <div>
    <n-data-table
      ref="table"
      remote
      :loading="isLoading"
      :columns="columns"
      :data="rolesData"
      :pagination="pagination"
      :bordered="false"
      @update:page="handlePageChange"
    />
    <!-- <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        :title="modalTitle"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra>
          <n-icon size="20" @click="modalCancel">
            <CloseOutline></CloseOutline>
          </n-icon>
        </template>
        <div>
          <n-tree
            block-line
            checkable
            cascade
            :data="authTreeList"
            :default-checked-keys="defaultCheckedKeys"
            key-field="id"
            label-field="auth_description"
            children-field="children"
            selectable
            @update:checked-keys="updateCheckedKeys"
          />
        </div>
        <template #footer>
          <n-space justify="end">
            <n-button
              type="primary"
              :loading="modalConfirmLoading"
              @click="modalConfirm"
            >
              确定
            </n-button>
            <n-button @click="modalCancel">取消</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal> -->

    <HModal :show="showModal" @update:show="updateShow">
      <div>
        <n-tree
          block-line
          checkable
          cascade
          :data="authTreeList"
          :default-checked-keys="defaultCheckedKeys"
          key-field="id"
          label-field="auth_description"
          children-field="children"
          selectable
          @update:checked-keys="updateCheckedKeys"
        />
      </div>
    </HModal>
  </div>
</template>

<script lang="ts">
import { CloseOutline } from '@vicons/ionicons5';
import { NButton, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref, watch, reactive } from 'vue';

import type { DataTableColumns } from 'naive-ui';

import { fetchTreeList } from '@/api/auth';
import { fetchList, fetchRoleAuth, fetchUpdateRoleAuth } from '@/api/role';
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

export default defineComponent({
  components: { CloseOutline, HModal },
  setup() {
    let rolesData = ref([]);
    let authTreeList = ref([]);
    let checkedKeys = ref([]);
    let defaultCheckedKeys = ref([]);
    let total = ref(0);

    let currentRole = ref();
    let isLoading = ref(false);
    let modalConfirmLoading = ref(false);
    let showModal = ref(false);
    let modalTitle = ref('修改角色');
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
      newVal === false && (currentRole.value = undefined);
    };

    const paginationReactive = reactive({
      page: 0, //当前页
      pageCount: 0, //总页数
      pageSize: 0, //分页大小
      prefix() {
        return `一共${total.value}条数据`;
      },
    });

    /** ajaxfetchList */
    const ajaxFetchList = async (params) => {
      try {
        isLoading.value = true;
        const res: any = await fetchList(params);
        if (res.code === 200) {
          isLoading.value = false;
          rolesData.value = res.data.rows;
          total.value = res.data.total;
          paginationReactive.page = params.nowPage;
          paginationReactive.pageCount = Math.ceil(
            res.data.total / params.pageSize
          );
          paginationReactive.pageSize = params.pageSize;
        } else {
          Promise.reject(res);
        }
      } catch (err) {
        Promise.reject(err);
      }
    };

    onMounted(async () => {
      await ajaxFetchList(params);
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
            return h(NSpace, {}, [
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: 'small',
                  onClick: async () => {
                    console.log('click');
                    const allAuth = await fetchTreeList();
                    const auth = await fetchRoleAuth(row.id);
                    authTreeList.value = allAuth.data;
                    defaultCheckedKeys.value = auth.data.map((v) => v.id);
                    currentRole.value = row;
                    showModal.value = true;
                  },
                },
                '编辑'
              ),
              h(
                NButton,
                {
                  size: 'small',
                  type: 'primary',
                  onClick: async () => {
                    console.log('click');
                    const allAuth = await fetchTreeList();
                    const auth = await fetchRoleAuth(row.id);
                    authTreeList.value = allAuth.data;
                    defaultCheckedKeys.value = auth.data.map((v) => v.id);
                    currentRole.value = row;
                    showModal.value = !showModal.value;
                  },
                },
                '新增角色'
              ),
            ]);
          },
        },
      ];
    };

    const modalConfirm = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchUpdateRoleAuth(
          currentRole.value.id,
          defaultCheckedKeys.value
        );
        showModal.value = false;
        window.$message.success('修改成功');
      } catch (error) {
        console.log(error);
      }
      modalConfirmLoading.value = false;
    };
    const modalCancel = () => {
      showModal.value = false;
      console.log('first');
    };
    const updateCheckedKeys = (keys) => {
      defaultCheckedKeys.value = keys;
    };
    return {
      updateShow,
      handlePageChange,
      isLoading,
      modalConfirmLoading,
      currentRole,
      modalConfirm,
      updateCheckedKeys,
      modalCancel,
      authTreeList,
      defaultCheckedKeys,
      checkedKeys,
      showModal,
      modalTitle,
      rolesData,
      columns: createColumns(),
      pagination: paginationReactive,
    };
  },
});
</script>

<style lang="scss" scoped></style>
