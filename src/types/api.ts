/**
 * 接口类型定义
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResponseData<T = any> {
  code: number;
  msg: string;
  data: T;
}


