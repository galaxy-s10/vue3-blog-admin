import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/email_user/list',
    method: 'get',
    params,
  });
}

// 绑定邮箱
export function fetchBindEmail({ email, code }) {
  return request({
    url: '/api/email_user/bind_user',
    method: 'post',
    data: { email, code },
  });
}

// 发送绑定邮箱验证码
export function fetchSendBindEmailCode(email) {
  return request({
    url: '/api/email_user/send_bind_code',
    method: 'post',
    data: { email },
  });
}

// 取绑邮箱
export function fetchCancelBindEmail(code) {
  return request({
    url: '/api/email_user/cancel_bind_user',
    method: 'post',
    data: { code },
  });
}
// 发送取绑邮箱验证码
export function fetchCancelSendBindEmailCode(email) {
  return request({
    url: '/api/email_user/send_cancel_bind_code',
    method: 'post',
    data: { email },
  });
}
