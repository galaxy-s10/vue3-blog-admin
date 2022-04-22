<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :loading="typeListLoading"
      :columns="columns"
      :data="typeListData"
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
      <AddType
        ref="addTypeRef"
        v-model="currRow"
        :show-action="false"
      ></AddType>
    </HModal>
  </div>
</template>

<script lang="ts">
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref } from 'vue';

import AddType from '../add/index.vue';
import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

import type { DataTableColumns } from 'naive-ui';

import { fetchTypeList, fetchUpdateType, fetchDeleteType } from '@/api/type';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IType, IList } from '@/interface';

interface ISearch extends IType, IList {}

export default defineComponent({
  components: { HSearch, HModal, AddType },
  setup() {
    const typeListData = ref([]);
    const total = ref(0);
    let paginationReactive = usePage();

    const modalConfirmLoading = ref(false);
    const modalVisiable = ref(false);
    const modalTitle = ref('编辑分类');
    const typeListLoading = ref(false);
    const currRow = ref({});
    const addTypeRef = ref<any>(null);
    const params = ref<ISearch>({
      nowPage: 1,
      pageSize: 10,
    });
    const createColumns = (): DataTableColumns<IType> => {
      const action: any = {
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
                  onClick: async () => {
                    modalVisiable.value = true;
                    currRow.value = { ...row };
                  },
                },
                () => '编辑' //用箭头函数返回性能更好。
              ),
              h(
                NPopconfirm,
                {
                  'positive-text': '确定',
                  'negative-text': '取消',
                  'on-positive-click': async () => {
                    await fetchDeleteType(row.id!);
                    await handlePageChange(params.value.nowPage);
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
                  default: () => '确定删除吗?',
                }
              ),
            ]
          );
        },
      };
      return [...columnsConfig(), action];
    };

    const ajaxFetchList = async (params) => {
      try {
        typeListLoading.value = true;
        const res: any = await fetchTypeList(params);
        if (res.code === 200) {
          typeListLoading.value = false;
          typeListData.value = res.data.rows;
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

    onMounted(async () => {
      await ajaxFetchList(params.value);
    });

    const handlePageChange = async (currentPage) => {
      params.value.nowPage = currentPage;
      await ajaxFetchList({ ...params.value, nowPage: currentPage });
    };

    const handleSearch = (v) => {
      params.value = { ...params.value, ...v };
      handlePageChange(1);
    };

    const modalCancel = () => {
      modalVisiable.value = false;
    };

    const modalConfirm = async () => {
      try {
        modalConfirmLoading.value = true;
        const res = await addTypeRef.value.validateForm();
        await fetchUpdateType({
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

    const modalUpdateShow = (newVal) => {
      modalVisiable.value = newVal;
    };

    return {
      modalConfirmLoading,
      modalVisiable,
      modalTitle,
      modalConfirm,
      modalCancel,
      modalUpdateShow,
      handlePageChange,
      handleSearch,
      currRow,
      addTypeRef,
      typeListData,
      typeListLoading,
      columns: createColumns(),
      pagination: paginationReactive,
      searchFormConfig,
    };
  },
});
</script>

<style lang="scss" scoped></style>
