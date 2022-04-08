import request from '@/utils/request';

interface IRole {
  id: number;
  role_name: string;
  role_description: string;
  p_id: number;
  role_auths: number[];
}

/** 角色列表(分页) */
export function fetchList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params,
  });
}

/** 角色列表(不分页) */
export function fetchAllList() {
  return request({
    url: '/role/all_list',
    method: 'get',
  });
}

/** 获取树型角色 */
export function fetchTreeList(id?: number) {
  return request({
    url: `/role/tree_list`,
    method: 'get',
    params: { id },
  });
}

/** 获取某个角色的权限 */
export function fetchRoleAuth(id) {
  return request({
    url: `/role/get_role_auth/${id}`,
    method: 'get',
  });
}

/** 新增角色 */
export function fetchCreateRole({
  p_id,
  role_name,
  role_description,
  role_auths,
}: IRole) {
  return request({
    url: `/role/create`,
    method: 'post',
    data: {
      p_id,
      role_name,
      role_description,
      role_auths,
    },
  });
}

/** 修改角色 */
export function fetchUpdateRole({
  id,
  p_id,
  role_name,
  role_description,
  role_auths,
}: IRole) {
  return request({
    url: `/role/update/${id}`,
    method: 'put',
    data: {
      p_id,
      role_name,
      role_description,
      role_auths,
    },
  });
}

/** 删除角色 */
export function fetchDeleteRole(id: number) {
  return request({
    url: `/role/delete/${id}`,
    method: 'delete',
  });
}
