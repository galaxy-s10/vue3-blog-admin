import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/qq_user/list',
    method: 'get',
    params,
  });
}

// qq登录
export function fetchQQLogin(code: any) {
  return request({
    url: `/api/qq_user/login?code=${code}`,
    method: 'get',
  });
}

// 绑定qq
export function fetchBindQQ(code: any) {
  return request({
    url: `/api/qq_user/bind_user?code=${code}`,
    method: 'get',
  });
}
// 取消绑定qq
export function fetchCancelBindQQ() {
  return request({
    url: `/api/qq_user/cancel_bind_user`,
    method: 'get',
  });
}
