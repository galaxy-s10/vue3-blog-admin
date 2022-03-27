import axios from 'axios';
import Cookies from 'js-cookie';

import router from '@/router';
import cache from '@/utils/cache';
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? undefined : '/admin/',
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = cache.getStorage('token');
    // @ts-ignore
    config.headers['csrf-token'] = Cookies.get('csrf-token');
    console.log(Cookies.get('csrf-token'));
    if (token) {
      // @ts-ignore
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
    console.log(error, 22);
    if (error.response && error.response.status) {
      const whiteList = ['400', '401', '403']; // 这三个状态码是后端会返回的
      if (!whiteList.includes(`${error.response.status}`)) {
        // 网关超时504
        window.$message.error(error.message);
        return Promise.reject(error);
      }
      console.log(error.response, 1);
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
      console.log(error.message, 100);
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
