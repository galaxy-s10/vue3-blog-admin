import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/type/list',
    method: 'get',
    params,
  });
}
