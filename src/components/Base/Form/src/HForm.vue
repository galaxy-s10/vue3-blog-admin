<template>
  <div>
    <n-form
      ref="formRef"
      label-width="auto"
      label-align="right"
      :label-placement="labelPlacement"
      :style="formStyle"
      :model="modelValue"
    >
      <n-grid :cols="24" :x-gap="24">
        <template v-for="item in formItems" :key="item.field">
          <n-form-item-gi
            v-if="!item.isHidden"
            :span="item.gridSpan || gridSpan"
            :label="item.label"
            :label-width="item.labelWidth"
            :path="item.field"
            :rule="item.rule"
            :style="item.style"
          >
            <template v-if="item.type === 'input'">
              <n-input
                clearable
                :value="modelValue[`${item.field}`]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                type="text"
                @update:value="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === 'number'">
              <n-input-number
                clearable
                :value="modelValue[`${item.field}`]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                @update:value="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === 'password'">
              <n-input
                clearable
                :value="modelValue[`${item.field}`]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                type="password"
                @update:value="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <n-select
                :value="modelValue[`${item.field}`]"
                :options="item.options"
                :disabled="item.disabled"
                :placeholder="item.placeholder"
                clearable
                @update:value="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === 'radio'">
              <n-radio-group
                :value="modelValue[`${item.field}`]"
                @update:value="handleValueChange($event, item.field)"
              >
                <n-radio
                  v-for="radio in item.options"
                  :key="radio.label"
                  :value="radio.value"
                >
                  {{ radio.label }}
                </n-radio>
              </n-radio-group>
            </template>
            <template v-else-if="item.type === 'checkbox'">
              <n-checkbox-group
                :value="modelValue[`${item.field}`]"
                @update:value="handleValueChange($event, item.field)"
              >
                <n-checkbox
                  v-for="checkbox in item.options"
                  :key="checkbox.label"
                  :value="checkbox.value"
                >
                  {{ checkbox.label }}
                </n-checkbox>
              </n-checkbox-group>
            </template>
            <template v-else-if="item.type === 'switch'">
              <n-switch
                :value="modelValue[`${item.field}`]"
                :checked-value="item.checkedValue"
                :unchecked-value="item.unCheckedValue"
                @update:value="handleValueChange($event, item.field)"
              >
                <template #checked>{{ item.checkedText }}</template>
                <template #unchecked>{{ item.unCheckedText }}</template>
              </n-switch>
            </template>
            <template v-else-if="item.type === 'upload'">
              <Upload
                :model-value="modelValue[`${item.field}`]"
                @update:value="handleValueChange($event, item.field)"
              ></Upload>
            </template>
            <template v-else-if="item.type === 'markdown'">
              <MarkdownEditor
                :model-value="modelValue[`${item.field}`]"
                @update:value="handleValueChange($event, item.field)"
              ></MarkdownEditor>
            </template>
          </n-form-item-gi>
        </template>
      </n-grid>

      <n-form-item v-if="showAction" label=" ">
        <n-space>
          <n-button @click="handleReset">重置</n-button>
          <n-button
            type="success"
            :loading="confirmLoading"
            @click="handleConfirm"
          >
            确定
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { IFormItem } from '../types';

import type { PropType } from 'vue';

import Upload from '@/components/Base/Upload';
import MarkdownEditor from '@/components/MarkdownEditor';

export default defineComponent({
  components: {
    MarkdownEditor,
    Upload,
  },
  props: {
    modelValue: {
      type: Object,
      // required: true,
      default: () => {},
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    gridSpan: {
      type: Number,
      default: 24,
    },
    showAction: {
      type: Boolean,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    formStyle: {
      type: Object,
      default: () => {},
    },
    labelPlacement: {
      type: String,
      default: 'left',
    },
  },
  emits: ['update:modelValue', 'click:confirm'],
  setup(props, { emit }) {
    const formRef = ref<any>(null);

    const handleValueChange = (value: any, field: string) => {
      // console.log(field, value, 12411);
      emit('update:modelValue', { ...props.modelValue, [field]: value });
    };

    const handleReset = () => {
      let obj = {};
      for (const item in props.modelValue) {
        obj[`${item}`] = null;
      }
      emit('update:modelValue', obj);
    };

    const handleValidate = () => {
      return new Promise((resolve, reject) => {
        formRef.value.validate(async (error) => {
          if (!error) {
            resolve(props.modelValue);
          } else {
            reject(error);
          }
        });
      });
    };

    const handleConfirm = async () => {
      try {
        const res = await handleValidate();
        emit('click:confirm', res);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      formRef,
      handleValidate,
      handleReset,
      handleConfirm,
      handleValueChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
