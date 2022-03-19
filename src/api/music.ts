import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/admin/music/list',
    method: 'get',
    params,
  });
}
