import request from '@/utils/request';
import { CreateDeptParam, DeleteDeptParam, EditDeptParam, Params } from '@/types/dept';
import { DeptItem } from '@/types/dept';

export default {
  // 部门管理
  // 部门列表
  getDeptList(params?: Params) {
    return request.get<DeptItem[]>('/dept/list', params);
  },
  // 创建部门
  createDept(params: CreateDeptParam) {
    return request.post('/dept/create', params);
  },
  // 修改部门
  editDept(params: EditDeptParam) {
    return request.post('/dept/edit', params);
  },
  // 删除部门
  deleteDept(params: DeleteDeptParam) {
    return request.post('/dept/delete', params);
  },
};
