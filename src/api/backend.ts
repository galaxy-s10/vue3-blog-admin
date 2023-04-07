import { IBackend } from '@/interface';
import request, { IResponse } from '@/utils/request';

export function fetchBackendList(params): Promise<IResponse<IBackend>> {
  return request.get('/backend/list', { params });
}

export function fetchFindBackend(id: number): Promise<IResponse<IBackend>> {
  return request.get(`/backend/find/${id}`);
}

export function fetchCreateBackend(data: IBackend) {
  return request({
    url: `/backend/create`,
    method: 'post',
    data,
  });
}

export function fetchUpdateBackend(data: IBackend) {
  return request({
    url: `/backend/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteBackend(id: number) {
  return request({
    url: `/backend/delete/${id}`,
    method: 'delete',
  });
}
