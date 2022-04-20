import request from '@/utils/request';

export function fetchStarList(params) {
  return request({
    url: '/star/list',
    method: 'get',
    params,
  });
}
