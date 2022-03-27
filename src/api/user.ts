import request from '@/utils/request';

/** 邮箱+密码登录 */
export function fetchLogin({ email, password }) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: { email, password },
  });
}

/** 邮箱+验证码登录 */
export function fetchCodeLogin({ email, code }) {
  return request({
    url: '/api/user/code_login',
    method: 'post',
    data: {
      email,
      code,
    },
  });
}

export function fetchRegister({ email, code }) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: {
      email,
      code,
    },
  });
}

export function fetchQQLogin(code: any) {
  return request({
    url: `/api/qq_user/login?code=${code}`,
    method: 'get',
  });
}

export function fetchUserInfo() {
  return request({
    url: '/api/user/get_user_info',
    method: 'get',
  });
}
export function fetchUserList(params) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params,
  });
}
