import { PageParams } from "../api"

export enum IState {
  doing = 1,
  done = 2,
  timeout = 3,
  cance = 4
}

export interface CreateParams {
  cityName: string
  userName: string
  mobile: number
  startAddress: string //下单开始地址
  endAddress: string //下单结束地址
  orderAmount: number //订单金额
  userPayAmount: number //支付金额
  driverAmount: number //支付金额
  // 1: 微信 2：支付宝
  payType: number //支付方式
  driverName: string //司机名称
  vehicleName: string //订单车型
  // 1: 进行中 2：已完成 3：超时 4：取消
  state: IState // 订单状态
  // 用车时间
  useTime: string
  // 订单结束时间
  endTime: string
}

export interface OrderItem extends CreateParams {
  _id: string
  orderId: string //订单ID
  route: Array<{ lng: string; lat: string }> //行驶轨迹
  createTime: string //创建时间
  remark: string //备注
}

export interface SearchParams {
  orderId?: string
  userName?: string
  state?: IState
}
export interface Params extends PageParams {
  orderId?: string
  userName?: string
  state?: IState
}
export interface DictItem {
  id: string
  name: string
}
export interface OrderRoute {
  orderId: string //订单ID
  route: Array<{ lng: string; lat: string }>
}
export interface DriverParams {
  driverName?: string
  accountStatus?: number
}
export enum DriverStatus {
  auth = 0, // 待认证
  normal = 1, //正常
  temp = 2, // 暂时拉黑
  always = 3, // 永久拉黑
  stop = 4 //停止推送
}
export interface DriverItem {
  driverName: string // 司机名称
  driverId: number // 司机ID
  driverPhone: string // 司机手机号
  cityName: string // 城市名称
  grade: boolean // 会员等级
  driverLevel: number // 司机等级
  accountStatus: DriverStatus // 司机状态
  carNo: string // 车牌号
  vehicleBrand: string // 车辆品牌
  vehicleName: string // 车辆名称
  onlineTime: number // 昨日在线时长
  driverAmount: number // 昨日司机流水
  rating: number // 司机评分
  driverScore: number // 司机行为分
  pushOrderCount: number // 昨日推单数
  orderCompleteCount: number // 昨日完单数
  createTime: string // 创建时间
}