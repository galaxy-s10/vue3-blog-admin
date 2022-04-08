import request from '@/utils/request';

export function fetchDbJob() {
  return request({
    url: '/schedule/db_job',
    method: 'get',
  });
}

export function fetchInvokeDbJob() {
  return request({
    url: '/schedule/invoke_db_job',
    method: 'get',
  });
}
