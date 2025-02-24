import axios, { AxiosError } from 'axios';
import { showLoading, hideLoading } from './loading';
import { message } from 'antd';
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  timeoutErrorMessage: '请求超时, 请稍后再试',
  withCredentials: true,
  headers: {
    icode: '83ED095F04E97C39',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading();
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Token::' + token;
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
    const data = response.data;
    hideLoading();
    if (data.code === 500001) {
      message.error(data.msg);
      localStorage.removeItem('token');
      // location.href = '/login';
    } else if (data.code != 0) {
      message.error(data.msg);
      return Promise.reject(data);
    }
    return data.data;
  },
  error => {
    hideLoading()
    message.error(error.message);
    return Promise.reject(error.message);
  },
);

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params });
  },
  post<T>(url: string, params?: object): Promise<T> {
    return instance.post(url, params);
  },
};
