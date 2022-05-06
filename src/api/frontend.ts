import request from '@/utils/request';

export function fetchFrontendDetail() {
  return request({
    url: '/frontend/detail',
    method: 'get',
  });
}
export function fetchUpdateFrontend(data) {
  return request({
    url: `/frontend/update/${data.id}`,
    method: 'put',
    data,
  });
}
