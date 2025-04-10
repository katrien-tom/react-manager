import request from '@/utils/request';
import { EditRoleParams, RoleSearchParams, RoleItem, Permission } from '@/types/role';
import { ResultData } from '@/types/api';
export default {
  // 获取角色列表
  getRoleList: (params: RoleSearchParams) => {
    return request.get<ResultData<RoleItem>>('/roles/list', params);
  },
  // 创建角色
  createRole: (params: RoleItem) => {
    return request.post('/roles/create', params);
  },
  // 编辑角色
  editRole: (params: EditRoleParams) => {
    return request.post('/roles/edit', params);
  },
  // 删除角色
  deleteRole: (_id: string) => {
    return request.post('/roles/delete', { _id });
  },
  // 设置权限
  updatePermission(params: Permission) {
    return request.post('/roles/update/permission', params);
  },
  // 获取所有角色列表
  getAllRoleList() {
    return request.get<RoleItem[]>('/roles/allList');
  },
};
