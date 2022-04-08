import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/star/list',
    method: 'get',
    params,
  });
}
