import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/log/list',
    method: 'get',
    params,
  });
}
