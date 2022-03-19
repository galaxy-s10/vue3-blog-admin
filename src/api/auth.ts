import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/auth/list',
    method: 'get',
    params,
  });
}
