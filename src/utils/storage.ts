/**
 * localStorage 模块封装
 */
export default {
  /**
   * 设置 localStorage
   * @param key {string} 键
   * @param value {any} 值
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  /**
   * 获取 localStorage
   * @param key {string} 键
   * @returns {any} 值
   */
  get(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '{}');
  },
  /**
   * 删除 localStorage
   * @param key {string} 键
   */
  remove(key: string) {
    localStorage.removeItem(key);
  },
  /**
   * 清空 localStorage
   */
  clear() {
    localStorage.clear();
  },
};
