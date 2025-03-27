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
