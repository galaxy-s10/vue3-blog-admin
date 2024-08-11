<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
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
      <AddMusic
        ref="addMusicRef"
        v-model="currRow"
        :show-action="false"
      ></AddMusic>
    </HModal>
  </div>
</template>

<script lang="ts" setup>
import {
  DataTableColumns,
  NButton,
  NPopconfirm,
  NSpace,
  UploadFileInfo,
} from 'naive-ui';
import { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref } from 'vue';

import {
  fetchDeleteMusic,
  fetchMusicList,
  fetchUpdateMusic,
} from '@/api/music';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IList, IMusic } from '@/interface';

import AddMusic from '../add/index.vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

interface ISearch extends IMusic, IList {}

const tableListData = ref([]);
const total = ref(0);
const pagination = usePage();

const modalConfirmLoading = ref(false);
const modalVisiable = ref(false);
const modalTitle = ref('编辑音乐');
const tableListLoading = ref(false);
const currRow = ref({});
const addMusicRef = ref<any>(null);
const params = ref<ISearch>({
  nowPage: 1,
  pageSize: 10,
  orderName: 'id',
  orderBy: 'desc',
});

const createColumns = (): DataTableColumns<IMusic> => {
  const action: TableColumn<IMusic> = {
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
                if (typeof row.cover_pic === 'string') {
                  row.cover_pic = [
                    {
                      id: row.cover_pic,
                      name: row.cover_pic,
                      url: row.cover_pic,
                      status: 'finished',
                      percentage: 100,
                    },
                  ] as UploadFileInfo[];
                } else {
                  row.audio_url = [];
                }
                if (typeof row.audio_url === 'string') {
                  row.audio_url = [
                    {
                      id: row.audio_url,
                      name: row.audio_url,
                      url: row.audio_url,
                      status: 'finished',
                      percentage: 100,
                    },
                  ] as UploadFileInfo[];
                } else {
                  row.audio_url = [];
                }
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
                await fetchDeleteMusic(row.id!);
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
const ajaxFetchList = async (args) => {
  try {
    tableListLoading.value = true;
    const res: any = await fetchMusicList(args);
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
    const res = await addMusicRef.value.validateForm();
    await fetchUpdateMusic({
      id: res.id,
      author: res.author,
      name: res.name,
      audio_url: res.audio_url,
      status: res.status,
      cover_pic: res.cover_pic,
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

<style lang="scss" scoped></style>
