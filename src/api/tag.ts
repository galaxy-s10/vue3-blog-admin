import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/tag/list',
    method: 'get',
    params,
  });
}
