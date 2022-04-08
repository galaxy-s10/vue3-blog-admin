import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/music/list',
    method: 'get',
    params,
  });
}
