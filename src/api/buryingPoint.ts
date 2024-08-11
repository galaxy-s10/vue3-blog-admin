import request from '@/utils/request';

export function fetchBuryingPointList(params) {
  return request.get('/burying_point/list', {
    params,
  });
}
