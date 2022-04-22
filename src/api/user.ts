import { IUser } from '@/interface';
import request from '@/utils/request';

export function fetchLogin({ id, password }) {
  return request({
    url: '/user/login',
    method: 'post',
    data: { id, password },
  });
}

export function fetchUserInfo() {
  return request({
    url: '/user/get_user_info',
    method: 'get',
  });
}

export function fetchUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  });
}

export function fetchUserDetail(id: number) {
  return request({
    url: `/user/find/${id}`,
    method: 'get',
  });
}

export function fetchUpdateUser({ id, username, status, avatar, desc }: IUser) {
  return request({
    url: `/user/update/${id}`,
    method: 'put',
    data: {
      username,
      status,
      avatar,
      desc,
    },
  });
}
export function fetchUpdateUserRole({ id, user_roles }: IUser) {
  return request({
    url: `/user/update_user_role/${id}`,
    method: 'put',
    data: {
      user_roles,
    },
  });
}
