import { PageParams } from '@/types/api';

export interface UserInfo {
  _id: string;
  userImg: string;
  userId: number;
  userName: string;
  userEmail: string;
  mobile: string;
  deptId: string;
  deptName: string;
  job: string;
  state: number;
  role: number;
  createId: number;
  roleList: string;
}

export interface Params extends PageParams {
  userId?: number;
  userName?: string;
  state?: number;
}
