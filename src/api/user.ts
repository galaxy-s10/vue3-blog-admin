import request from '@/utils/request';

export function fetchLogin({ account, password }) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: { id: account, password },
  });
}

export function fetchQQLogin(code: any) {
  return request({
    url: `/api/qq_user/login?code=${code}`,
    method: 'get',
  });
}

export function fetchUserInfo() {
  return request({
    url: '/api/user/get_user_info',
    method: 'get',
  });
}
