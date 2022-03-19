import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/works/list',
    method: 'get',
    params,
  });
}
