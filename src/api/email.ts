import request from '@/utils/request';

export function fetchSendCode(email) {
  return request({
    url: '/api/email/send',
    method: 'post',
    data: { email },
  });
}
