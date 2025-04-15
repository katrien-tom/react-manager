/**
 * 工具函数封装
 */

import { MenuItem } from '@/types/menu';

// 格式化金额
export const formatMoney = (num?: number | string) => {
  if (!num) return '0.00'
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

// 格式化数字
export const formatNum = (num?: number | string) => {
  if (!num) return 0
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

// 获取页面路径
export const getMenuPath = (list: MenuItem[]): string[] => {
  return list.reduce((result: string[], item: MenuItem) => {
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '');
  }, []);
};

/**
 * 手机号加密
 * @example
 * 17611000011 => 176****0011
 */
export const formateMobile = (mobile?: number) => {
  if (!mobile) return '-'
  const phone = mobile.toString()
  return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

// 递归获取路由对象
export const searchRoute: any = (path: string, routes: any = []) => {
  // 确保 routes 是数组
  if (!Array.isArray(routes)) {
    routes = [];
  }
  for (const item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      const result = searchRoute(path, item.children);
      if (result) return result;
    }
  }
  return '';
};

/**
 * 递归查找树的路径
 */
export const findTreeNode = (tree: MenuItem[], pathName: string, path: string[]): string[] => {
  if (!tree) return []
  for (const data of tree) {
    path.push(data.menuName)
    if (data.path === pathName) return path
    if (data.children?.length) {
      const list = findTreeNode(data.children, pathName, path)
      if (list?.length) return list
    }
    path.pop()
  }
  return []
}