import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/log/list',
    method: 'get',
    params,
  });
}
