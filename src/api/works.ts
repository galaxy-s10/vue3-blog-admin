import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/works/list',
    method: 'get',
    params,
  });
}
