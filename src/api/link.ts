import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/link/list',
    method: 'get',
    params,
  });
}
