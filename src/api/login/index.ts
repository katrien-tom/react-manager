import request from '@/utils/request';
import { LoginForm, LoginResponse } from '@/types/login';

export default {
  login: (data: LoginForm) => {
    return request.post<LoginResponse>('/login', data, { showLoading: false });
  },
};
