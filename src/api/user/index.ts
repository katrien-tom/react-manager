import request from "@/utils/request";
import { UserInfo } from "@/types/user";

export default {
  // 获取用户信息
  getUserInfo: () => {
    return request.get<UserInfo>('/users/getUserInfo');
  },
};
