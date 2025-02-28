/**
 * 接口类型定义
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResultData<T = any> {
  list: T[];
  page: {
    total: number | 0;
    pageSize: number;
    pageNum: number;
  };
}
export interface PageParams  {
  pageNum: number;
  pageSize: number;
}
