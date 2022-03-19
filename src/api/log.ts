import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/log/list',
    method: 'get',
    params,
  });
}
