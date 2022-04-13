export interface IUser {
  id: number;
  username: string;
  status: number;
  avatar: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
export interface IRole {
  id?: number;
  role_name?: string;
  role_value?: string;
  type?: number;
  priority?: number | string;
  p_id?: number | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: null;
  role_auths?: number[];
  c_roles?: number[];
}

export enum ModalTypeEnum {
  EDIT = 1,
  ADD = 2,
  ASSING = 3,
  DELETE_CHILD = 4,
  ADD_CHILD = 5,
}
