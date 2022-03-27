import request from '@/utils/request';

export function fetchSendCode(email) {
  return request({
    url: '/api/other/send_email',
    method: 'post',
    data: { email },
  });
}
