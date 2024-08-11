<template>
  <div>
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
      <div ref="addArticleRef">
        <div v-if="qiniuCdnList?.length">
          一共{{ qiniuCdnList.length }}个图片
          <div class="qiniuCdnList-wrap">
            <div
              v-for="(item, index) in qiniuCdnList"
              :key="index"
            >
              {{ item }}
              <img
                :src="item"
                width="50"
              />
              <n-button
                size="small"
                @click="deleteImg(item)"
              >
                删除
              </n-button>
            </div>
          </div>
        </div>
        <div v-else>没有七牛云cdn图片</div>
      </div>
    </HModal>
  </div>
</template>

<script lang="ts" setup>
import { DataTableColumns, NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumn } from 'naive-ui/lib/data-table/src/interface';
import { h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  fetchArticleDetail,
  fetchArticleList,
  fetchDeleteArticle,
  fetchUpdateArticle,
} from '@/api/article';
import { fetchDeleteQiniuDataByQiniuKey } from '@/api/qiniuData';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { QINIU_CDN_URL } from '@/constant';
import { usePage } from '@/hooks/use-page';
import { IArticle, IList } from '@/interface';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

interface ISearch extends IArticle, IList {}

const tableListData = ref([]);
const qiniuCdnList = ref<any>();
const total = ref(0);
const pagination = usePage();
const router = useRouter();
const modalConfirmLoading = ref(false);
const modalVisiable = ref(false);
const modalTitle = ref('编辑文章');
const tableListLoading = ref(false);
const addArticleRef = ref<any>(null);
const params = ref<ISearch>({
  nowPage: 1,
  pageSize: 10,
  orderName: 'id',
  orderBy: 'desc',
});
const createColumns = (): DataTableColumns<IArticle> => {
  const action: TableColumn<IArticle> = {
    title: '操作',
    key: 'actions',
    width: 300,
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
                qiniuCdnList.value = [];
                modalVisiable.value = true;
                modalTitle.value = '查看图片';
                const { code, data, message }: any = await fetchArticleDetail(
                  row.id as number
                );
                if (code === 200) {
                  const str: string = data.content;
                  const reg =
                    /https:\/\/resource\.hsslive\.cn\/image\/.+?(jpg|jpeg|png|gif|webp)/gim;
                  const arr = str.match(reg);
                  if (Array.isArray(arr)) {
                    qiniuCdnList.value = [...new Set(arr)];
                  }
                } else {
                  window.$message.error(message);
                }
              },
            },
            () => '查看图片' // 用箭头函数返回性能更好。
          ),
          h(
            NButton,
            {
              size: 'small',
              onClick: () => {
                router.push({
                  name: 'editArticle',
                  query: { id: row.id },
                });
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
                await fetchDeleteArticle(row.id!);
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
const deleteImg = async (url) => {
  const key = url.replace(QINIU_CDN_URL, '');
  const res = await fetchDeleteQiniuDataByQiniuKey(key);
  window.$message.success(res.data);
};

const ajaxFetchList = async (args) => {
  try {
    tableListLoading.value = true;
    const res: any = await fetchArticleList(args);
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
    const res = await addArticleRef.value.validateForm();
    await fetchUpdateArticle({
      ...res,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    });
    window.$message.success('更新成功!');
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
.qiniuCdnList-wrap {
  max-height: 300px;
  overflow: scroll;
}
</style>
