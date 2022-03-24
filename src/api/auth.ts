import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/auth/list',
    method: 'get',
    params,
  });
}
