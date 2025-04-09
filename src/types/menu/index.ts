export interface MenuParams {
  menuName?: string;
  menuState?: number;
}

export interface CreateParams {
  // 菜单名称
  menuName: string;
  // 菜单图标
  icon?: string;
  // 1：菜单 2：按钮 3：页面
  menuType: number;
  // 1：正常 2：停用
  menuState: number;
  // 按钮权限标识
  menuCode?: string;
  // 父级菜单ID
  parentId?: string;
  // 菜单路径
  path?: string;
  // 组件名称
  component?: string;
}

export interface MenuItem extends CreateParams {
  _id: string;
  createTime: string;
  buttons?: MenuItem[];
  children?: MenuItem[];
}


export interface EditMenuParams extends CreateParams{
  _id?: string;
}

export interface DeleteMenuParams{
  _id: string;
}