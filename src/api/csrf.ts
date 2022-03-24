import request from '@/utils/request';

export function fetchCsrf() {
  return request({
    url: '/api/csrf/get',
    method: 'get',
  });
}
