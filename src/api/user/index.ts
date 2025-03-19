import request from "@/utils/request";
import { CreateUserParams, EditUserParams, SearchParams, UserInfo } from "@/types/user";
import { ResultData } from "@/types/api";

export default {
  // 获取用户信息
  getUserInfo: () => {
    return request.get<UserInfo>('/users/getUserInfo');
  },
  // 获取用户列表
  getUserList: (params: SearchParams) => {
    return request.get<ResultData<UserInfo>>('/users/list', params);
  },
  // 新增用户
  createUser: (data: CreateUserParams) => {
    return request.post<ResultData>('/users/create', data);
  },
  // 编辑用户
  editUser: (data: EditUserParams) => {
    return request.post<ResultData>('/users/edit', data);
  },
};
