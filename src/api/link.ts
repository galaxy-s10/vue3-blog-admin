import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/link/list',
    method: 'get',
    params,
  });
}
