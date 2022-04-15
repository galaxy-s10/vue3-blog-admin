import { type FormItemRule } from 'naive-ui';
import { type StyleValue } from 'vue';

type IFormType =
  | 'input'
  | 'password'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch';

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
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
