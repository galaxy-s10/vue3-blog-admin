<template>
  <div>
    <n-data-table
      ref="table"
      remote
      :loading="isLoading"
      :columns="columns"
      :data="userListData"
      :pagination="pagination"
      :bordered="false"
      :scroll-x="1500"
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
      <div v-if="modalType === modalUserTypeEnum.EDIT">
        <n-form
          ref="formRef"
          :inline="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item label="用户名" path="username">
            <n-input
              v-model:value="formValue.username"
              placeholder="请输入用户名"
            />
          </n-form-item>
          <n-form-item label="头像" path="avatar">
            <n-input
              v-model:value="formValue.avatar"
              placeholder="请输入头像url"
            />
          </n-form-item>
          <n-form-item label="简介" path="desc">
            <n-input v-model:value="formValue.desc" placeholder="请输入简介" />
          </n-form-item>
          <n-form-item label="状态" path="status">
            <n-radio-group v-model:value="formValue.status" name="radiogroup">
              <n-space>
                <n-radio
                  v-for="item in statusRadio"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
        </n-form>
      </div>
      <div v-if="modalType === modalUserTypeEnum.EDIT_ROLE">
        <n-form
          ref="formRef"
          :inline="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item label="用户名" path="username">
            <n-input
              v-model:value="formValue.username"
              placeholder="请输入用户名"
              disabled
            />
          </n-form-item>
          <n-form-item label="角色" path="user_roles">
            <n-tree
              style="width: 100%"
              checkable
              cascade
              selectable
              :data="roleTreeList"
              :default-checked-keys="formValue.user_roles"
              key-field="id"
              label-field="role_name"
              children-field="children"
              @update:checked-keys="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
      </div>
    </HModal>
  </div>
</template>

<script lang="ts">
import { NButton, NSpace } from 'naive-ui';
import { h, defineComponent, onMounted, ref, reactive } from 'vue';

import type { DataTableColumns, FormInst } from 'naive-ui';

import { fetchTreeRole, fetchUserRole } from '@/api/role';
import {
  fetchUserList,
  fetchUserDetail,
  fetchUpdateUser,
  fetchUpdateUserRole,
} from '@/api/user';
import HModal from '@/components/Base/Modal';
import { IUser, modalUserTypeEnum } from '@/interface';

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['input', 'blur', 'change'],
  },
};

export default defineComponent({
  components: { HModal },
  setup() {
    let userListData = ref([]);
    let total = ref(0);
    let formValue = ref<IUser>({
      id: 1,
      username: '',
      desc: '',
      avatar: '',
      status: 1,
      user_roles: [],
    });
    let modalConfirmLoading = ref(false);
    let modalVisiable = ref(false);
    let modalTitle = ref('');
    let modalType = ref<modalUserTypeEnum>(modalUserTypeEnum.EDIT);
    let isLoading = ref(false);
    let roleTreeList = ref([]);
    let defaultCheckedKeys = ref([]);

    const formRef = ref<FormInst | null>(null);
    const createColumns = (): DataTableColumns<IUser> => {
      return [
        {
          title: 'id',
          key: 'id',
          align: 'center',
        },
        {
          title: '用户名',
          key: 'username',
          align: 'center',
        },
        {
          title: '头像',
          key: 'avatar',
          align: 'center',
          render(row) {
            return h('img', {
              src: row.avatar,
              width: 100,
            });
          },
        },
        {
          title: '简介',
          key: 'desc',
          align: 'center',
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render(row) {
            return row.status === 1 ? '正常' : '非法';
          },
        },
        {
          title: '创建时间',
          key: 'created_at',
          align: 'center',
        },
        {
          title: '更新时间',
          key: 'updated_at',
          align: 'center',
        },
        {
          title: '操作',
          key: 'actions',
          fixed: 'right',
          align: 'center',
          render(row) {
            return h(NSpace, { justify: 'center' }, () => [
              h(
                NButton,
                {
                  size: 'small',
                  onClick: async () => {
                    const userInfo = await fetchUserDetail(row.id!);
                    formValue.value = { ...userInfo.data };
                    modalTitle.value = '编辑用户';
                    modalType.value = modalUserTypeEnum.EDIT;
                    modalVisiable.value = !modalVisiable.value;
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
                    const userInfo = await fetchUserDetail(row.id!);
                    const userRole = await fetchUserRole(row.id!);
                    await ajaxFetchTreeRole();

                    formValue.value = {
                      ...userInfo.data,
                      user_roles: userRole.data.result.map((v) => v.id),
                    };
                    modalTitle.value = '编辑角色';
                    modalType.value = modalUserTypeEnum.EDIT_ROLE;
                    modalVisiable.value = !modalVisiable.value;
                  },
                },
                () => '编辑角色' //用箭头函数返回性能更好。
              ),
            ]);
          },
        },
      ];
    };
    const params = reactive({
      nowPage: 1,
      pageSize: 10,
      orderBy: 'asc',
      orderName: 'id',
    });
    const updateCheckedKeys = (keys) => {
      defaultCheckedKeys.value = keys;
      formValue.value.user_roles = keys;
    };
    let statusRadio = ref([
      {
        value: 1,
        label: '正常',
      },
      {
        value: 2,
        label: '禁用',
      },
    ]);

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
        const res: any = await fetchUserList(params);
        if (res.code === 200) {
          isLoading.value = false;
          userListData.value = res.data.rows;
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

    const ajaxFetchTreeRole = async () => {
      try {
        const res: any = await fetchTreeRole();
        if (res.code === 200) {
          roleTreeList.value = res.data;
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
      params.nowPage = currentPage;
      await ajaxFetchList({ ...params, nowPage: currentPage });
    };
    const modalUpdateShow = (newVal) => {
      modalVisiable.value = newVal;
    };

    const updateUser = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchUpdateUser({
          ...formValue.value,
        });
        modalVisiable.value = false;
        window.$message.success('修改成功!');
        handlePageChange(params.nowPage);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
      }
    };
    const updateUserRole = async () => {
      try {
        modalConfirmLoading.value = true;
        await fetchUpdateUserRole({
          id: formValue.value.id,
          user_roles: formValue.value.user_roles,
        });
        modalVisiable.value = false;
        window.$message.success('修改成功!');
        handlePageChange(params.nowPage);
      } catch (error) {
        console.log(error);
      } finally {
        modalConfirmLoading.value = false;
      }
    };

    const modalConfirm = () => {
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          switch (modalType.value) {
            case modalUserTypeEnum.EDIT:
              updateUser();
              break;
            case modalUserTypeEnum.EDIT_ROLE:
              updateUserRole();
              break;
            default:
              window.$message.warning('错误的操作!');
              break;
          }
        }
      });
    };

    const modalCancel = () => {
      modalVisiable.value = false;
    };

    return {
      modalConfirmLoading,
      modalType,
      modalVisiable,
      modalTitle,
      modalConfirm,
      modalCancel,
      modalUpdateShow,
      rules,
      formValue,
      formRef,
      handlePageChange,
      isLoading: isLoading,
      userListData,
      columns: createColumns(),
      pagination: paginationReactive,
      modalUserTypeEnum,
      statusRadio,
      roleTreeList,
      updateCheckedKeys,
    };
  },
});
</script>

<style lang="scss" scoped></style>
