import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/qq_user/list',
    method: 'get',
    params,
  });
}
