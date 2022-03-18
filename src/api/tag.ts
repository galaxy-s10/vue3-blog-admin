import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/tag/list',
    method: 'get',
    params,
  });
}
