import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/qq_user/list',
    method: 'get',
    params,
  });
}

export function fetchQQLogin(code: any) {
  return request({
    url: `/api/qq_user/login?code=${code}`,
    method: 'get',
  });
}
