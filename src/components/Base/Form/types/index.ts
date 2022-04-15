import { type StyleValue } from 'vue';

type IFormType = 'input' | 'password' | 'select' | 'radio' | 'checkbox';

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rule?: any[];
  disabled?: boolean;
  path?: string;
  placeholder?: any;
  options?: any[];
  isHidden?: boolean;
  style?: StyleValue;
}
export interface IForm {
  formItems: IFormItem[];
  inline?: Boolean;
  labelPlacement?: 'top' | 'left';
}
