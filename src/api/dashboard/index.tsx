import request from '@/utils/request';
import { ReportData } from '@/types/dashboard';

export default {
    // 获取工作台汇总数据
    getReportData: () => {
        return request.get<ReportData>('/order/dashboard/getReportData');
    },
};

