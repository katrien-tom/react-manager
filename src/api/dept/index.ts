import request from '@/utils/request';
import { Params } from '@/types/dept';
import { DeptItem } from '@/types/dept';

export default {
  // 部门管理
  // 部门列表
  getDeptList(params: Params) {
    return request.get<DeptItem[]>('/dept/list', params);
  },
};
