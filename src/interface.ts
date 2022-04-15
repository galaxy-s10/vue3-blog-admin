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
export interface IAuth {
  id?: number;
  auth_name?: string;
  auth_value?: string;
  type?: number;
  priority?: number | string;
  p_id?: number | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: null;
  c_auths?: number[];
}

export interface IUser {
  id?: number;
  username?: string;
  status?: number;
  avatar?: string;
  desc?: string;
  user_roles?: number[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}

export interface ILink {
  id?: number;
  email?: string;
  name?: string;
  avatar?: string;
  desc?: string;
  url?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}
export interface IMusic {
  id?: number;
  name?: string;
  cover_pic?: string;
  author?: string;
  audio_url?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}
export interface IList {
  nowPage?: number;
  pageSize?: number;
  orderBy?: string;
  orderName?: string;
  keyWord?: string;
}
export interface IWorks {
  id?: number;
  name?: string;
  desc?: string;
  url?: string;
  bg_url?: string;
  priority?: string;
  status?: number;
}

export interface ITag {
  id?: number;
  name?: string;
  color?: string;
}
export interface IType {
  id?: number;
  name?: string;
}

export enum modalTypeEnum {
  EDIT = 1,
  ADD = 2,
  BATCH_DELETE = 4,
  BATCH_ADD = 5,
}

export enum modalUserTypeEnum {
  EDIT = 1,
  EDIT_ROLE = 2,
}
