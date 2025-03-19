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

export interface CreateUserParams {
  userName: string;
  userEmail: string;
  mobile: string;
  deptId: string;
  job?: string;
  state?: number;
  roleList: string[];
  userImg: string;
}

export interface EditUserParams extends CreateUserParams {
  userId: number;
}

export interface SearchParams extends PageParams {
  userId?: number;
  userName?: string;
  state?: number;
}
