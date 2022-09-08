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

// 上传图片
export function fetchUpload(
  data,
  onUploadProgress?
): Promise<IResponse<IUploadRes>> {
  // data:new FormData {prefix,uploadFiles}
  return request.post('/qiniu_data/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data;' },
    timeout: 1000 * 60,
    onUploadProgress: (e) => {
      console.log(e);
      onUploadProgress?.(e);
    },
  });
}

// 获取上传图片进度
export function fetchUploadProgress(hash: string): Promise<
  IResponse<{
    type: string;
    hash: string;
    uploadBytes: number;
    totalBytes: number;
  }>
> {
  return request.get('/qiniu_data/progress', {
    timeout: 1000 * 10,
    params: { hash },
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
    // delete请求的话，设置params参数都是在地址栏的，因此会将如果参数是数组，会将数组序列化，如http://127.0.0.1:3300/role/batch_delete_child_roles?id=1&c_roles=18&c_roles=2&c_roles=%2733%27
    method: 'delete',
    // data: { qiniu_key },
    params: { qiniu_key }, // 后端的koa-body设置了strict:true，则delete不会解析data数据，因此需要使用params
  });
}
