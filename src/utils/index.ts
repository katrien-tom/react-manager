/**
 * 工具函数封装
 */

import { MenuItem } from '@/types/menu';

// 格式化金额
export const formatMoney = (value: number | string) => {
  const a = parseFloat(value as string);
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' });
};

// 获取页面路径
export const getMenuPath = (list: MenuItem[]): string[] => {
  return list.reduce((result: string[], item: MenuItem) => {
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '');
  }, []);
};

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
