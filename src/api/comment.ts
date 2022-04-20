import request from '@/utils/request';

export function fetchCommentList(params) {
  return request({
    url: '/comment/list',
    method: 'get',
    params,
  });
}
