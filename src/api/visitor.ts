import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api//visitor_log/list',
    method: 'get',
    params,
  });
}
