import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/auth/list',
    method: 'get',
    params,
  });
}

/** 获取树型权限 */
export function fetchTreeList(id?: number) {
  return request({
    url: `/api/auth/tree_list`,
    method: 'get',
    params: { id },
  });
}
