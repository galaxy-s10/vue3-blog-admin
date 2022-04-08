import request from '@/utils/request';

interface IAuth {
  id: number;
  auth_name: string;
  auth_description: string;
  p_id: number;
}

/** 权限列表(分页) */
export function fetchList(params) {
  return request({
    url: '/auth/list',
    method: 'get',
    params,
  });
}

/** 权限列表(不分页) */
export function fetchAllList() {
  return request({
    url: `/auth/all_list`,
    method: 'get',
  });
}

/** 获取该权限的子权限 */
export function fetchChildAuth(id) {
  return request({
    url: `/auth/get_child_auth/${id}`,
    method: 'get',
  });
}

/** 获取树型权限 */
export function fetchTreeList(id?: number) {
  return request({
    url: `/auth/tree_list`,
    method: 'get',
    params: { id },
  });
}

/** 新增权限 */
export function fetchCreateAuth({ p_id, auth_name, auth_description }: IAuth) {
  return request({
    url: `/auth/create`,
    method: 'post',
    data: {
      p_id,
      auth_name,
      auth_description,
    },
  });
}

/** 修改权限 */
export function fetchUpdateAuth({
  id,
  p_id,
  auth_name,
  auth_description,
}: IAuth) {
  return request({
    url: `/auth/update/${id}`,
    method: 'put',
    data: {
      p_id,
      auth_name,
      auth_description,
    },
  });
}

/** 删除权限 */
export function fetchDeleteAuth(id: number) {
  return request({
    url: `/auth/delete/${id}`,
    method: 'delete',
  });
}
