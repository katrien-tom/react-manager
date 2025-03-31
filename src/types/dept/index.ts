// 部门管理
export interface Params {
  deptName?: string;
}
export interface DeptItem {
  _id: string;
  createTime: string;
  updateTime: string;
  deptName: string;
  parentId: string;
  userName: string;
  children: DeptItem[];
}

export interface CreateDeptParam {
  deptName: string;
  parentId?: string;
  userName: string;
}

export interface EditDeptParam extends CreateDeptParam{
  _id: string;
}

export interface DeleteDeptParam{
  _id: string;
}