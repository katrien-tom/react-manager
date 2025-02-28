import request from "@/utils/request";
import { Params, UserInfo } from "@/types/user";
import { ResultData } from "@/types/api";

export default {
  // 获取用户信息
  getUserInfo: () => {
    return request.get<UserInfo>('/users/getUserInfo');
  },
  // 获取用户列表
  getUserList: (params: Params) => {
    return request.get<ResultData<UserInfo>>('/users/list', params);
  },
};
