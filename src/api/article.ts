import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/article/list',
    method: 'get',
    params,
  });
}
