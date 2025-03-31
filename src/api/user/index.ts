import request from '@/utils/request';
import { CreateUserParams, EditUserParams, SearchParams, UserInfo } from '@/types/user';
import { ResultData } from '@/types/api';

export default {
  // 获取用户信息
  getUserInfo() {
    return request.get<UserInfo>('/users/getUserInfo');
  },
  // 获取用户列表
  getUserList(params: SearchParams) {
    return request.get<ResultData<UserInfo>>('/users/list', params);
  },
  // 获取当前账号下的所有用户列表
  getAllUserList() {
    return request.get<UserInfo[]>('/users/all/list');
  },
  // 新增用户
  createUser(params: CreateUserParams) {
    return request.post<ResultData>('/users/create', params);
  },
  // 编辑用户
  editUser(params: EditUserParams) {
    return request.post<ResultData>('/users/edit', params);
  },
  // 删除和批量删除用户
  deleteUser(params: { userIds: number[] }) {
    return request.post<ResultData>('/users/delete', params);
  },
};
