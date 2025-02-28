import request from '@/utils/request';
import { LineChartData, PieChartData, RadarChartData, ReportData } from '@/types/dashboard';

export default {
    // 获取工作台汇总数据
    getReportData: () => {
        return request.get<ReportData>('/order/dashboard/getReportData');
    },
    // 获取折线图数据
    getLineChartData: () => {
        return request.get<LineChartData>('/order/dashboard/getLineData');
    },
    // 获取城市饼图数据
    getPieChartCityData: () => {
        return request.get<PieChartData[]>('/order/dashboard/getPieCityData');
    },
    // 获取年龄饼图数据
    getPieChartAgeData: () => {
        return request.get<PieChartData[]>('/order/dashboard/getPieAgeData');
    },
    // 获取雷达图数据
    getRadarChartData: () => {
        return request.get<RadarChartData>('/order/dashboard/getRadarData');
    },
};

