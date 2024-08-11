<template>
  <div>
    <div class="btn-warp">
      <n-button
        type="primary"
        @click="getDiff"
        >获取media/差异</n-button
      >
    </div>
    <div
      v-if="diffRes"
      class="diffRes-warp"
    >
      <div>
        <h3>officialDiff</h3>
        {{
          diffRes.officialDiff.length
            ? '差异数量：' + diffRes.officialDiff.length
            : ''
        }}
        <div
          v-if="diffRes.officialDiff.length"
          class="list"
        >
          <div
            v-for="(item, index) in diffRes.officialDiff"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div v-else>无差异</div>
      </div>
      <div>
        <h3>qiniudataDiff</h3>
        {{
          diffRes.qiniudataDiff.length
            ? '差异数量：' + diffRes.qiniudataDiff.length
            : ''
        }}
        <div
          v-if="diffRes.qiniudataDiff.length"
          class="list"
        >
          <div
            v-for="(item, index) in diffRes.qiniudataDiff"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div v-else>无差异</div>
      </div>
    </div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :scroll-x="scrollX"
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
      <EditQiniuData
        ref="addLinkRef"
        v-model="currRow"
        :show-action="false"
      ></EditQiniuData>
    </HModal>
  </div>
</template>

<script lang="ts" setup>
import { DataTableColumns, NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref } from 'vue';

import {
  fetchDeleteQiniuData,
  fetchDiff,
  fetchQiniuDataList,
  fetchUpdateQiniuData,
} from '@/api/qiniuData';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { QINIU_BLOG } from '@/constant';
import { usePage } from '@/hooks/use-page';
import { IList, IQiniuData } from '@/interface';

import EditQiniuData from '../edit/index.vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

interface ISearch extends IQiniuData, IList {}

const tableListData = ref([]);
const total = ref(0);
const pagination = usePage();

const modalConfirmLoading = ref(false);
const modalVisiable = ref(false);
const modalTitle = ref('编辑文件');
const tableListLoading = ref(false);
const currRow = ref({});
const diffRes = ref();
const addLinkRef = ref<any>(null);
const params = ref<ISearch>({
  nowPage: 1,
  pageSize: 10,
  orderName: 'created_at',
  orderBy: 'desc',
  prefix: QINIU_BLOG.prefix['media/'],
  bucket: QINIU_BLOG.bucket,
});
const createColumns = (): DataTableColumns<IQiniuData> => {
  const action: TableColumn<IQiniuData> = {
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
              onClick: () => {
                modalVisiable.value = true;
                currRow.value = { ...row };
              },
            },
            () => '编辑' // 用箭头函数返回性能更好。
          ),
          h(
            NPopconfirm,
            {
              'positive-text': '确定',
              'negative-text': '取消',
              'on-positive-click': async () => {
                try {
                  const { data } = await fetchDeleteQiniuData(row.id!);
                  window.$message.success(data);
                  await handlePageChange(params.value.nowPage);
                } catch (error) {
                  console.error(error);
                }
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
                  () => '删除' // 用箭头函数返回性能更好。
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

const columns = createColumns();
const scrollX = ref(0);
columns.forEach((item) => {
  if (item.width) {
    scrollX.value += Number(item.width);
  }
});
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

const ajaxFetchList = async (args) => {
  try {
    tableListLoading.value = true;
    const res: any = await fetchQiniuDataList(args);
    if (res.code === 200) {
      tableListLoading.value = false;
      tableListData.value = res.data.rows;
      total.value = res.data.total;
      pagination.page = args.nowPage;
      pagination.itemCount = res.data.total;
      pagination.pageSize = args.pageSize;
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

const modalConfirm = async () => {
  try {
    modalConfirmLoading.value = true;
    const res = await addLinkRef.value.validateForm();
    console.log(res);
    await fetchUpdateQiniuData({
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
</script>

<style lang="scss" scoped>
.btn-warp {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.diffRes-warp {
  display: flex;
  justify-content: center;

  & > div {
    margin: 0 30px;
  }
  .list {
    height: 150px;
    overflow-y: scroll;
  }
}
</style>
