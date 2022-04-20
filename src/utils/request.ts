import axios from 'axios';

import router from '@/router';
import cache from '@/utils/cache';

const config = {
  // baseURL: '/api/', // 本地开发：/api/，线上正式服：/prodapi/，线上测试服：/betaapi/
  timeout: 5000,
};

const service: any = axios.create(config);

// 请求拦截
service.interceptors.request.use(
  (config) => {
    switch (cache.getStorageExp('env')) {
      case 'prod':
        config.baseURL = '/prodapi/';
        break;
      case 'beta':
        config.baseURL = '/betaapi/';
        break;
      case 'development':
        config.baseURL = '/api/';
        break;
    }
    const token = cache.getStorageExp('token');
    // @ts-ignore
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
    if (error.response && error.response.status) {
      const whiteList = ['400', '401', '403']; // 这三个状态码是后端会返回的
      if (!whiteList.includes(`${error.response.status}`)) {
        // 网关超时504
        window.$message.error(error.message);
        return Promise.reject(error);
      }
      if (error.response.status === 400) {
        // 400错误不返回data
        window.$message.error(error.response.data.message);
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 401) {
        window.$message.error(error.response.data.message);
        cache.clearStorage('token');
        router.push('/login');
        window.close();
        window.opener?.postMessage(
          {
            type: 'login_expired',
            data: null,
          },
          '*'
        );
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 403) {
        window.$message.error(error.response.data.message);
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
