import request from '@/utils/request';

/** 账号密码登录 */
export function fetchLogin({ id, password }) {
  return request({
    url: '/user/login',
    method: 'post',
    data: { id, password },
  });
}

export function fetchUserInfo() {
  return request({
    url: '/user/get_user_info',
    method: 'get',
  });
}
export function fetchUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  });
}
