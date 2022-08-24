import { IQiniuData } from '@/interface';
import request from '@/utils/request';

export function fetchQiniuDataList(params) {
  return request({
    url: '/qiniu_data/list',
    method: 'get',
    params,
  });
}
export function fetchDiff(params) {
  return request({
    url: '/qiniu_data/diff',
    method: 'get',
    params,
  });
}

export function fetchUpload(data) {
  return request({
    url: '/qiniu_data/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;' },
    data,
  });
}

export function fetchCreateLink(data: IQiniuData) {
  return request({
    url: '/qiniu_data/create',
    method: 'post',
    data,
  });
}
export function fetchUpdateQiniuData(data: IQiniuData) {
  return request({
    url: `/qiniu_data/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteQiniuData(id: number) {
  return request({
    url: `/qiniu_data/delete/${id}`,
    method: 'delete',
  });
}
