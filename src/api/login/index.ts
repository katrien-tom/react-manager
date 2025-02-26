import request from '@/utils/request';
import { LoginForm} from '@/types/login';

export default {
  // 登录
  login: (data: LoginForm) => {
    return request.post<string>('/users/login', data, { showLoading: false });
  },
};
