<template>
  <div>
    <n-modal v-model:show="showModal">
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
        <slot>默认内容</slot>
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
    </n-modal>
  </div>
</template>

<script lang="ts">
import { CloseOutline } from '@vicons/ionicons5';
import {
  h,
  defineComponent,
  onMounted,
  toRefs,
  ref,
  watch,
  reactive,
} from 'vue';

export default defineComponent({
  components: { CloseOutline },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
  },
  emits: {
    'update:show': null,
  },
  setup(props, context) {
    const { show, title } = toRefs(props);

    let modalConfirmLoading = ref(false);
    let showModal = ref(show);
    let modalTitle = ref(title);
    const modalConfirm = async () => {};
    const modalCancel = () => {
      console.log('[[first]]');
      showModal.value = false;
    };

    watch(
      () => showModal.value,
      (newVal, oldVal) => {
        console.log('pp');
        context.emit('update:show', newVal, oldVal);
      }
    );

    return {
      modalConfirmLoading,
      modalConfirm,
      modalCancel,
      showModal,
      modalTitle,
    };
  },
});
</script>

<style lang="scss" scoped></style>
