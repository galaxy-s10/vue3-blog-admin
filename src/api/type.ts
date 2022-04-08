import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/type/list',
    method: 'get',
    params,
  });
}
