import axios, { AxiosError } from 'axios';

import { showLoading, hideLoading } from './loading';
import storage from './storage';
import { Result } from '@/types/api';
import { message } from '@/components/AntdGlobal';

const instance = axios.create({
  // 获取baseURL环境变量
  baseURL: import.meta.env.VITE_API_URL,
  // 获取timeout环境变量
  timeout: 5000,
  // 设置超时错误信息
  timeoutErrorMessage: '请求超时, 请稍后再试',
  // 设置withCredentials（跨域安全策略）
  withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) {
      showLoading();
    }
    const token = storage.get('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return {
      ...config,
    };
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data;
    hideLoading();
    if (data.code === 500001) {
      message.error(data.msg);
      storage.remove('token');
      location.href = '/login?callback=' + encodeURIComponent(window.location.href);
    } else if (data.code != 0) {
      message.error(data.msg);
      return Promise.reject(data);
    }
    return data.data;
  },
  error => {
    hideLoading();
    message.error(error.message);
    return Promise.reject(error.message);
  },
);

type IConfig = {
  showLoading?: boolean;
};

export default {
  get<T>(url: string, params?: object, config: IConfig = { showLoading: true }): Promise<T> {
    return instance.get(url, { params, ...config });
  },
  post<T>(url: string, params?: object, config: IConfig = { showLoading: true }): Promise<T> {
    return instance.post(url, params, { ...config });
  },
};
