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
    // @ts-ignore
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
  // eslint-disable-next-line consistent-return
  (error) => {
    const userStore = useUserStore();
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
