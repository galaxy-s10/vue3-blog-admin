import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api//music/list',
    method: 'get',
    params,
  });
}
