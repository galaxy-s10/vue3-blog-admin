import type { FormItemRule } from 'naive-ui';
import type { StyleValue } from 'vue';

type IFormType =
  | 'input'
  | 'password'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'markdown'
  | 'switch';

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  gridSpan?: number;
  labelWidth?: number;
  rule?: FormItemRule | Array<FormItemRule>;
  disabled?: boolean;
  path?: string;
  placeholder?: any;
  options?: any[];
  isHidden?: boolean;
  checkedValue?: any;
  unCheckedValue?: any;
  checkedText?: string;
  unCheckedText?: string;
  style?: StyleValue;
}
export interface IForm {
  formItems: IFormItem[];
  gridSpan?: Number;
  formStyle?: StyleValue;
  showAction?: Boolean;
  confirmLoading?: Boolean;
  labelPlacement?: 'top' | 'left';
}
