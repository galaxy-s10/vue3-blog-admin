<template>
  <div>
    <n-button type="primary" @click="getDiff">获取差异</n-button>
    <div v-if="diffRes" class="diffRes-warp">
      <div>
        <h3>officialDiff</h3>
        <div v-for="(item, index) in diffRes.officialDiff" :key="index">
          {{ item }}
        </div>
      </div>
      <div>
        <h3>qiniudataDiff</h3>
        <div v-for="(item, index) in diffRes.qiniudataDiff" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :scroll-x="2200"
      :loading="linkListLoading"
      :columns="columns"
      :data="linkListData"
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
      <AddLink
        ref="addLinkRef"
        v-model="currRow"
        :show-action="false"
      ></AddLink>
    </HModal>
  </div>
</template>

<script lang="ts">
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref } from 'vue';

import AddLink from '../upload/index.vue';
import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

import type { DataTableColumns } from 'naive-ui';

import { fetchDiff, fetchQiniuDataList } from '@/api/qiniuData';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { QINIU_BUCKET, QINIU_PREFIX } from '@/constant';
import { usePage } from '@/hooks/use-page';
import { IQiniuData, IList } from '@/interface';

interface ISearch extends IQiniuData, IList {}

export default defineComponent({
  components: { HSearch, HModal, AddLink },
  setup() {
    const linkListData = ref([]);
    const total = ref(0);
    let paginationReactive = usePage();

    const modalConfirmLoading = ref(false);
    const modalVisiable = ref(false);
    const modalTitle = ref('编辑友链');
    const linkListLoading = ref(false);
    const currRow = ref({});
    const diffRes = ref();
    const addLinkRef = ref<any>(null);
    const params = ref<ISearch>({
      nowPage: 1,
      pageSize: 10,
      orderName: 'id',
      orderBy: 'desc',
      prefix: QINIU_PREFIX['image/'],
      bucket: QINIU_BUCKET,
    });
    const createColumns = (): DataTableColumns<IQiniuData> => {
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
                    await fetchDeleteLink(row.id!);
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

    const getDiff = async () => {
      try {
        const res: any = await fetchDiff({ prefix: params.value.prefix });
        if (res.code === 200) {
          diffRes.value = res.data;
        } else {
          console.error(res);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const ajaxFetchList = async (params) => {
      try {
        linkListLoading.value = true;
        const res: any = await fetchQiniuDataList(params);
        if (res.code === 200) {
          linkListLoading.value = false;
          linkListData.value = res.data.rows;
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
      params.value = {
        ...params.value,
        ...v,
        nowPage: 1,
        pageSize: params.value.pageSize,
      };
      handlePageChange(1);
    };

    const modalCancel = () => {
      modalVisiable.value = false;
    };

    const modalConfirm = async () => {
      try {
        modalConfirmLoading.value = true;
        const res = await addLinkRef.value.validateForm();
        // await fetchUpdateLink({
        //   ...res,
        //   created_at: undefined,
        //   updated_at: undefined,
        //   deleted_at: undefined,
        // });
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
      addLinkRef,
      linkListData,
      linkListLoading,
      columns: createColumns(),
      pagination: paginationReactive,
      searchFormConfig,
      params,
      getDiff,
      diffRes,
    };
  },
});
</script>

<style lang="scss" scoped>
.diffRes-warp {
  display: flex;
}
</style>
