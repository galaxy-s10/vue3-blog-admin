import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/tag/list',
    method: 'get',
    params,
  });
}
