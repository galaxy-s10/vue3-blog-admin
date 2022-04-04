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
  id: number;
  role_name: string;
  role_description: string;
  p_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
