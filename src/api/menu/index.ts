import { DeleteMenuParams, EditMenuParams, MenuItem, MenuParams } from '@/types/menu';
import request from '@/utils/request';

export default {
  // 获取菜单列表
  getMenuList(params?: MenuParams) {
    return request.get<MenuItem[]>('/menu/list', params);
  },
  // 创建菜单
  createMenu(params: MenuParams) {
    return request.post<MenuItem[]>('/menu/create', params);
  },
  // 编辑菜单
  editMenu(params: EditMenuParams) {
    return request.post<MenuItem[]>('/menu/edit', params);
  },
  // 删除菜单
  deleteMenu(params: DeleteMenuParams) {
    return request.post<MenuItem[]>('/menu/delete', params);
  },
};
