import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api//role/list',
    method: 'get',
    params,
  });
}
