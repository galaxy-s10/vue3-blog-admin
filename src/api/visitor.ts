import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/visitor_log/list',
    method: 'get',
    params,
  });
}
