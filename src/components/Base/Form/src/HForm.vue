<template>
  <div>
    <n-form
      ref="formRef"
      :inline="inline"
      :label-width="80"
      :label-placement="labelPlacement"
    >
      <template v-for="item in formItems" :key="item.label">
        <n-form-item
          v-if="!item.isHidden"
          :label="item.label"
          :path="item.path"
          :rule="item.rule"
          :style="item.style"
        >
          <template v-if="item.type === 'input'">
            <n-input
              :value="modelValue[`${item.field}`]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              type="text"
              @update:value="handleValueChange($event, item.field)"
            />
          </template>
          <template v-else-if="item.type === 'password'">
            <n-input
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
        </n-form-item>
      </template>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import { IFormItem } from '../types';

export default defineComponent({
  components: {},
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    inline: {
      type: Boolean,
      default: false,
    },
    labelPlacement: {
      type: String as PropType<'top' | 'left'>,
      default: 'left',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value });
    };

    return {
      handleValueChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
