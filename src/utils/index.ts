/**
 * 工具函数封装
 */

// 格式化金额
export const formatMoney = (value: number | string) => {
  const a = parseFloat(value as string);
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' });
};
