import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/star/list',
    method: 'get',
    params,
  });
}
