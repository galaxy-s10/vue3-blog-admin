import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/comment/list',
    method: 'get',
    params,
  });
}
