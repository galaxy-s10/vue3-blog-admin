<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      @click-search="handleSearch"
    ></HSearch>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { IForm } from '@/components/Base/Form';
import HSearch from '@/components/Base/Search';

export default defineComponent({
  name: 'Dashboard',
  components: { HSearch },

  setup() {
    const searchFormConfig: IForm = {
      inline: true,
      labelPlacement: 'left',
      formItems: [
        {
          field: 'name',
          type: 'input',
          label: '角色名称',
          placeholder: '请输入角色名称',
          style: {
            width: '300px',
          },
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
    return { searchFormConfig, handleSearch };
  },
});
</script>

<style lang="scss" scoped></style>
