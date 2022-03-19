import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/star/list',
    method: 'get',
    params,
  });
}
