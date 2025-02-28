export interface ReportData {
  driverCount: number;
  totalMoney: number;
  orderCount: number;
  cityNum: number;
}

export interface LineChartData {
  label: string[];
  order: number[];
  money: number[];
}

export interface PieChartData {
  name: string;
  value: number;
}

export interface RadarChartData {
  indicator: Array<{ name: string; max: number }>;
  data: {
    name: string;
    value: number[];
  }[];
}
