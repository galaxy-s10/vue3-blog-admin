import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/type/list',
    method: 'get',
    params,
  });
}
