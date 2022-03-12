import axios from 'axios';
import cache from '@/utils/cache';

const service = axios.create({
  // baseURL: 'http://localhost:3100',
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = cache.getCache('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const whiteList = ['400', '401', '403']; // 这三个状态码是后端会返回的
    if (!whiteList.includes(`${error.response.status}`)) {
      window.$message.error(error);
      return Promise.reject(error);
    }
    if (error.response) {
      const message =
        error.response.data.error.message || error.response.data.message;
      window.$message.error(message);
      if (error.response.status === 400) {
        // 400错误不返回data
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 401) {
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 403) {
        return Promise.reject(error.response.data);
      }
    } else {
      window.$message.error(error.response.message);
      return Promise.reject(error.response);
    }
  }
);
export default service;
