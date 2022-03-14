import axios from 'axios';
import cache from '@/utils/cache';
import router from '@/router';

const service = axios.create({
  // baseURL: 'http://localhost:3100',
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = cache.getStorage('token');
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
  // eslint-disable-next-line consistent-return
  (error) => {
    if (error.response && error.response.status) {
      const whiteList = ['400', '401', '403']; // 这三个状态码是后端会返回的
      if (!whiteList.includes(`${error.response.status}`)) {
        window.$message.error(error);
        return Promise.reject(error);
      }
      const message =
        error.response.data.error.message || error.response.data.message;
      window.$message.error(message);
      if (error.response.status === 400) {
        // 400错误不返回data
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 401) {
        cache.clearStorage('token');
        router.push('/login');
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 403) {
        return Promise.reject(error.response.data);
      }
    } else {
      if (error.response) {
        window.$message.error(error.response.message);
        return Promise.reject(error.response);
      }
      window.$message.error(error.message);
      return Promise.reject(error);
    }
  }
);
export default service;
