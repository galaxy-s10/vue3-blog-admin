import request from '@/utils/request';

export function fetchDbJob() {
  return request({
    url: '/admin/schedule/db_job',
    method: 'get',
  });
}

export function fetchInvokeDbJob() {
  return request({
    url: '/admin/schedule/invoke_db_job',
    method: 'get',
  });
}
