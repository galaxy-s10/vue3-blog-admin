export interface IStar {
  id?: number;
  article_id?: number;
  comment_id?: number;
  from_user_id?: number;
  to_user_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
  from_user?: IUser;
  to_user?: IUser;
  article?: any;
  comment?: any;
}
export interface IComment {
  id?: number;
  article_id?: number;
  parent_comment_id?: number;
  reply_comment_id?: number;
  from_user_id?: number;
  to_user_id?: number;
  content?: string;
  children_comment_total?: number;
  star_total?: number;
  ua?: string;
  ip?: string;
  ip_data?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
  from_user?: IUser;
  to_user?: IUser;
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
export interface ITheme {
  id?: number;
  model?: number;
  key?: string;
  value?: string;
  lang?: string;
  desc?: string;
}
export interface IArticle {
  id?: number;
  title?: string;
  desc?: string;
  content?: string;
  head_img?: string;
  is_comment?: number;
  priority?: number;
  status?: number;
  click?: number;
  tags?: number[];
  types?: number[];
  users?: number[];
  keyword?: string;
}

export interface ILog {
  id?: number;
  user_id?: number;
  api_user_agent?: string;
  api_sql_duration?: number;
  api_from?: number;
  api_ip?: string;
  api_hostname?: string;
  api_method?: string;
  api_path?: string;
  api_query?: string;
  api_body?: string;
  api_err_msg?: string;
  api_err_stack?: string;
}
export interface IVisitor {
  id?: number;
  user_id?: number;
  ip?: string;
  status?: number;
  ip_data?: string;
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
