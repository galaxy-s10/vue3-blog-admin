import request from '@/utils/request';

export function fetchLogin({ account, password }) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data: { id: account, password },
  });
}

export function fetchQQLogin(code: any) {
  return request({
    url: `/admin/qq_user/login?code=${code}`,
    method: 'get',
  });
}

export function fetchUserInfo() {
  return request({
    url: '/admin/user/get_user_info',
    method: 'get',
  });
}
export function fetchUserList(params) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params,
  });
}
