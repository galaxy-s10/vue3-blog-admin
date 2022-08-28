import { IQiniuData, IUploadRes } from '@/interface';
import request, { IResponse } from '@/utils/request';

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

export function fetchUpload(data): Promise<IResponse<IUploadRes>> {
  return request.post('/qiniu_data/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data;' },
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
export function fetchDeleteQiniuDataByQiniuKey(qiniu_key: string) {
  return request({
    url: `/qiniu_data/delete_by_qiniukey`,
    method: 'delete',
    // data: { qiniu_key },
    params: { qiniu_key }, //后端的koa-body设置了strict:true，则delete不会解析data数据，因此需要使用params
  });
}
