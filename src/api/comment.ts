import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/comment/list',
    method: 'get',
    params,
  });
}
