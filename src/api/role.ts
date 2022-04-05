import request from '@/utils/request';

export function fetchList(params) {
  return request({
    url: '/api/role/list',
    method: 'get',
    params,
  });
}

/** 获取树型角色 */
export function fetchTreeList(id?: number) {
  return request({
    url: `/api/role/tree_list`,
    method: 'get',
    params: { id },
  });
}

/** 获取某个角色的权限 */
export function fetchRoleAuth(id) {
  return request({
    url: `/api/role/get_role_auth/${id}`,
    method: 'get',
  });
}

/** 修改某个角色的权限 */
export function fetchUpdateRoleAuth(id: number, auth_ids: number[]) {
  return request({
    url: `/api/role/update_role_auth`,
    method: 'put',
    data: {
      id,
      auth_ids,
    },
  });
}
