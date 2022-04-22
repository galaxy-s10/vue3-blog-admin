<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :scroll-x="1800"
      :loading="articleListLoading"
      :columns="columns"
      :data="articleListData"
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
      <AddArticle
        ref="addArticleRef"
        v-model="currRow"
        :show-action="false"
      ></AddArticle>
    </HModal>
  </div>
</template>

<script lang="ts">
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AddArticle from '../add';
import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

import type { DataTableColumns } from 'naive-ui';

import {
  fetchArticleList,
  fetchUpdateArticle,
  fetchDeleteArticle,
} from '@/api/article';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IArticle, IList } from '@/interface';

interface ISearch extends IArticle, IList {}

export default defineComponent({
  components: { HSearch, HModal, AddArticle },
  setup() {
    const articleListData = ref([]);
    const total = ref(0);
    let paginationReactive = usePage();
    let router = useRouter();
    const modalConfirmLoading = ref(false);
    const modalVisiable = ref(false);
    const modalTitle = ref('编辑文章');
    const articleListLoading = ref(false);
    const currRow = ref({});
    const addArticleRef = ref<any>(null);
    const params = ref<ISearch>({
      nowPage: 1,
      pageSize: 10,
      orderName: 'id',
      orderBy: 'desc',
    });
    const createColumns = (): DataTableColumns<IArticle> => {
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
                    router.push({
                      name: 'updateArticle',
                      query: { id: row.id },
                    });
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
                    await fetchDeleteArticle(row.id);
                    window.$message.success('已删除!');
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
        articleListLoading.value = true;
        const res: any = await fetchArticleList(params);
        if (res.code === 200) {
          articleListLoading.value = false;
          articleListData.value = res.data.rows;
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
        const res = await addArticleRef.value.validateForm();
        await fetchUpdateArticle({
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
      addArticleRef,
      articleListData,
      articleListLoading,
      columns: createColumns(),
      pagination: paginationReactive,
      searchFormConfig,
      params,
    };
  },
});
</script>

<style lang="scss" scoped></style>
