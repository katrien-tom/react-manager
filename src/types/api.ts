/**
 * 接口类型定义
 */

export interface ResponseData<T = any> {
  code: number;
  msg: string;
  data: T;
}


