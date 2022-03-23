import request from '@/utils/request';

export function fetchDbJob() {
  return request({
    url: '/api//schedule/db_job',
    method: 'get',
  });
}

export function fetchInvokeDbJob() {
  return request({
    url: '/api//schedule/invoke_db_job',
    method: 'get',
  });
}
