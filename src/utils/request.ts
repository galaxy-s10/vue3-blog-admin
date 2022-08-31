import axios, { AxiosRequestConfig } from 'axios';

import router from '@/router';
import { useUserStore } from '@/store/user';
import cache from '@/utils/cache';

const config: AxiosRequestConfig = {
  // baseURL: '/api/', // 本地开发：/api/，线上正式服：/prodapi/，线上测试服：/betaapi/
  timeout: 5000,
};

const service = axios.create(config);

export interface IResponse<T> {
  code: number;
  data: T;
  message: string;
}

// 请求拦截
service.interceptors.request.use(
  (cfg) => {
    switch (cache.getStorageExp('env')) {
      case 'prod':
        cfg.baseURL = '/prodapi/';
        break;
      case 'beta':
        cfg.baseURL = '/betaapi/';
        break;
      case 'development':
        cfg.baseURL = '/api/';
        break;
    }
    const token = cache.getStorageExp('token');
    if (token) {
      // @ts-ignore
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
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
    const userStore = useUserStore();
    const statusCode = error.response.status;
    const errorResponseData = error.response.data;
    const whiteList = ['400', '401', '403'];
    if (error.response) {
      if (!whiteList.includes(`${statusCode}`)) {
        if (statusCode === 500) {
          window.$message.error(errorResponseData.message);
          return Promise.reject(errorResponseData.message);
        }
        window.$message.error(error.message);
        return Promise.reject(error);
      }
      if (statusCode === 400) {
        window.$message.error(errorResponseData.message);
        return Promise.reject(errorResponseData);
      }
      if (statusCode === 401) {
        window.$message.error(errorResponseData.message);
        userStore.logout();
        router.push('/login');
        window.close();
        window.opener?.postMessage(
          {
            type: 'login_expired',
            data: null,
          },
          '*'
        );
        return Promise.reject(errorResponseData);
      }
      if (statusCode === 403) {
        window.$message.error(errorResponseData.message);
        return Promise.reject(errorResponseData);
      }
    } else {
      window.$message.error(error?.message);
      return Promise.reject(error);
    }
  }
);
export default service;
