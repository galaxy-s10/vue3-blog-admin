import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api//comment/list',
    method: 'get',
    params,
  });
}
