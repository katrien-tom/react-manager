import { ResultData } from '@/types/api';
import { CreateParams, DictItem, OrderItem, OrderRoute, Params, SearchParams, DriverParams, DriverItem} from '@/types/order';
import request from '@/utils/request';

export default {
  // 获取订单列表
  getOrderList(params: Params) {
    return request.get<ResultData<OrderItem>>('/order/list', params);
  },
  // 获取城市列表
  getCityList() {
    return request.get<DictItem[]>('/order/cityList');
  },
  // 获取车型列表
  getVehicleList() {
    return request.get<DictItem[]>('/order/vehicleList');
  },
  // 创建订单
  createOrder(params: CreateParams) {
    return request.post('/order/create', params);
  },
  // 获取订单详情
  getOrderDetail(orderId: string) {
    return request.get<OrderItem>(`/order/detail/${orderId}`);
  },
  // 更新订单信息
  updateOrderInfo(params: OrderRoute) {
    return request.post('/order/edit', params);
  },
  // 删除订单
  delOrder(orderId: string) {
    return request.post('/order/delete', { _id: orderId });
  },
  exportData(params: SearchParams) {
    return request.downloadFile('/order/orderExport', params, '订单列表.xlsx');
  },
  // 获取城市聚合点数据
  getCityData(cityId: number) {
    return request.get<Array<{ lng: string; lat: string }>>(`/order/cluster/${cityId}`);
  },
  // 获取司机列表
  getDrvierList(params: DriverParams) {
    return request.get<ResultData<DriverItem>>('/order/driver/list', params);
  },
};
