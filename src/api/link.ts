import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api//link/list',
    method: 'get',
    params,
  });
}
