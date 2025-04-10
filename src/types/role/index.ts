import { PageParams } from '@/types/api';

export interface RoleSearchParams extends PageParams {
  roleName?: string;
}

export interface CreateRoleParams {
  roleName: string;
  remark?: string;
}

export interface RoleItem extends CreateRoleParams {
  _id: string;
  permissionList: {
    checkedKeys: string[];
    halfCheckedKeys: string[];
  };
  updateTime: string;
  createTime: string;
}

export interface EditRoleParams extends CreateRoleParams {
  _id: string;
}
export interface Permission {
  _id: string
  permissionList: {
    checkedKeys: string[]
    halfCheckedKeys: string[]
  }
}