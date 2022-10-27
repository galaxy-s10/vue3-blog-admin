import { IFrontend } from '@/interface';
import request, { IResponse } from '@/utils/request';

export function fetchFrontendDetail(): Promise<IResponse<IFrontend>> {
  return request.get('/frontend/detail');
}
export function fetchUpdateFrontend(data: IFrontend) {
  return request({
    url: `/frontend/update/${data.id}`,
    method: 'put',
    data,
  });
}
