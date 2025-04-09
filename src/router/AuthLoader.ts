import userApi from '@/api/user';
import { MenuItem } from '@/types/menu';
import { getMenuPath } from '@/utils';
export interface IAuthLoader {
  buttonList: string[];
  menuList: MenuItem[];
  menuPathList: string[];
}
export default async function AuthLoader() {
  const data = await userApi.getPermissionList();
  const menuPathList = getMenuPath(data.menuList);
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList,
  };
}
