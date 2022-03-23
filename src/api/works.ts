import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api//works/list',
    method: 'get',
    params,
  });
}
