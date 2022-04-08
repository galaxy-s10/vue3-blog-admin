import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params,
  });
}
