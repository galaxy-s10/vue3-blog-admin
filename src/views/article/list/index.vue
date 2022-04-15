<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      ref="table"
      remote
      :loading="isLoading"
      :columns="columns"
      :data="listData"
      :pagination="pagination"
      :bordered="false"
      :scroll-x="1500"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { NButton, type DataTableColumns } from 'naive-ui';
import { h, defineComponent, onMounted, ref, reactive } from 'vue';

import { fetchList } from '@/api/article';
import { IForm } from '@/components/Base/Form';
import HSearch from '@/components/Base/Search';
import { IMG_CDN_URL } from '@/constant';
type IProp = {
  id: number;
  title: string;
  desc: any;
  is_comment: number;
  status: number;
  head_img: string;
  click: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  types: any[];
  users: any[];
  tags: any[];
  star_total: number;
  comment_total: number;
};
const createColumns = (): DataTableColumns<IProp> => {
  return [
    {
      title: 'id',
      key: 'id',
      width: '100',
      align: 'center',
    },
    {
      title: '标题',
      key: 'title',
      width: '100',
      align: 'center',
    },
    {
      title: '简介',
      key: 'desc',
      width: '200',
      align: 'center',
      render(row) {
        return h('div', {}, row.desc || '-');
      },
    },
    {
      title: '是否开启评论',
      key: 'is_comment',
      width: '120',
      align: 'center',
      render(row) {
        return h('b', null, row.is_comment === 1 ? '开启' : '关闭');
      },
    },
    {
      title: '状态',
      key: 'status',
      width: '100',
      align: 'center',
      render(row) {
        return h('b', null, row.status === 1 ? '审核通过' : '未审核');
      },
    },
    {
      title: '封面图',
      key: 'head_img',
      width: '200',
      align: 'center',
      render(row) {
        return h('img', {
          src: IMG_CDN_URL + row.head_img,
          width: 100,
        });
      },
    },
    {
      title: '点击量',
      key: 'click',
      width: '200',
      align: 'center',
    },
    {
      title: '获赞数',
      key: 'star_total',
      width: '200',
      align: 'center',
    },
    {
      title: '评论数',
      key: 'comment_total',
      width: '200',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'created_at',
      width: '200',
      align: 'center',
    },
    {
      title: '最后更新',
      key: 'updated_at',
      width: '200',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'actions',
      width: '100',
      align: 'center',
      render() {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
          },
          () => 'Action'
        );
      },
    },
  ];
};

export default defineComponent({
  components: { HSearch },
  setup() {
    let listData = ref([]);
    let total = ref(0);

    let isLoading = ref(false);
    const params = reactive({
      nowPage: 1,
      pageSize: 10,
      orderBy: 'desc',
      orderName: 'id',
    });
    const paginationReactive = reactive({
      page: 0, //当前页
      itemCount: 0, //总条数
      pageSize: 0, //分页大小
      prefix() {
        return `一共${total.value}条数据`;
      },
    });

    const ajaxFetchList = async (params) => {
      try {
        isLoading.value = true;
        const res: any = await fetchList(params);
        if (res.code === 200) {
          isLoading.value = false;
          listData.value = res.data.rows;
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
      await ajaxFetchList(params);
    });
    const handlePageChange = async (currentPage) => {
      await ajaxFetchList({ ...params, nowPage: currentPage });
    };
    const searchFormConfig: IForm = {
      gridSpan: 6,
      formStyle: {
        justifyContent: 'center',
      },
      labelPlacement: 'left',
      formItems: [
        {
          field: 'name',
          type: 'input',
          label: '角色名称',
          placeholder: '请输入角色名称',
        },
        {
          field: 'p_id',
          type: 'select',
          label: '父级角色',
          placeholder: '请选择父级角色',
          options: [
            { label: '管理员', value: 1 },
            { label: '用户', value: 2 },
            { label: '开发者', value: 3 },
          ],
          style: {
            width: '300px',
          },
        },
        {
          field: 'status',
          type: 'radio',
          label: '状态',
          placeholder: '请选择状态',
          options: [
            { label: '正常', value: 1 },
            { label: '禁用', value: 2 },
            { label: '非法', value: 3 },
          ],
        },
        {
          field: 'hobby',
          type: 'checkbox',
          label: '爱好',
          placeholder: '请选择爱好',
          options: [
            { label: 'game', value: 1 },
            { label: 'code', value: 2 },
            { label: 'eat', value: 3 },
          ],
        },
      ],
    };
    const handleSearch = (v) => {
      console.log('search', v);
    };
    return {
      handlePageChange,
      isLoading: isLoading,
      listData,
      columns: createColumns(),
      pagination: paginationReactive,
      searchFormConfig,
      handleSearch,
    };
  },
});
</script>

<style lang="scss" scoped></style>
