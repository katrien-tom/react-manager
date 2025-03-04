import { useEffect, useState } from 'react';

import { Card, Descriptions, Button } from 'antd';
import { DescriptionsProps } from 'antd/es/descriptions';

import { useStore } from '@/store';
import { ReportData } from '@/types/dashboard';
import dashboard from '@/api/dashboard';
import { useCharts } from '@/hooks/useCharts';
import styles from './index.module.scss';

export default function Dashboard() {
  const { userInfo } = useStore();
  const [reportData, setReportData] = useState<ReportData>();

  // 初始化折线图
  const [lineChartRef, lineChartInstance] = useCharts();
  // 初始化饼图
  const [pieChartCityRef, pieChartCityInstance] = useCharts();
  const [pieChartAgeRef, pieChartAgeInstance] = useCharts();
  // 初始化雷达图
  const [radarChartRef, radarChartInstance] = useCharts();

  useEffect(() => {
    getLineChartData();
    getPieChartCityData();
    getPieChartAgeData();
    getRadarChartData();
  }, [lineChartInstance, pieChartCityInstance, pieChartAgeInstance, radarChartInstance]);
  const getLineChartData = async () => {
    if (!lineChartInstance) return;
    const data = await dashboard.getLineChartData();
    lineChartInstance?.setOption({
      // title: {
      //   text: '订单和流水走势图',
      // },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['订单', '流水'],
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20,
      },
      xAxis: {
        data: data.label,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data.order,
        },
        {
          name: '流水',
          type: 'line',
          data: data.money,
        },
      ],
    });
  };
  const getPieChartCityData = async () => {
    if (!pieChartCityInstance) return;
    const data = await dashboard.getPieChartCityData();
    pieChartCityInstance?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data: data,
        },
      ],
    });
  };
  const getPieChartAgeData = async () => {
    if (!pieChartAgeInstance) return;
    const data = await dashboard.getPieChartAgeData();
    pieChartAgeInstance?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: [30, 120],
          roseType: 'area',
          data: data,
        },
      ],
    });
  };
  const getRadarChartData = async () => {
    if (!radarChartInstance) return;
    const data = await dashboard.getRadarChartData();
    radarChartInstance?.setOption({
      legend: {
        data: ['司机模型诊断'],
      },
      radar: {
        indicator: data.indicator,
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: data.data,
        },
      ],
    });
  };
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: userInfo.userId,
    },
    {
      key: '2',
      label: '邮箱',
      children: userInfo.userEmail,
    },
    {
      key: '3',
      label: '状态',
      children: userInfo.state === 1 ? '在职' : userInfo.state === 2 ? '离职' : '试用期',
    },
    {
      key: '4',
      label: '手机号',
      children: userInfo.mobile,
    },
    {
      key: '5',
      label: '岗位',
      children: userInfo.job,
    },
    {
      key: '6',
      label: '部门',
      children: '技术部',
    },
  ];
  const getReportData = async () => {
    const data = await dashboard.getReportData();
    setReportData(data);
  };
  // 刷新饼图
  const refreshPieChart = () => {
    getPieChartCityData();
    getPieChartAgeData();
  };
  useEffect(() => {
    getReportData();
  }, []);
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          className={styles.userImage}
        />
        <Descriptions title='欢迎新同学，每天都要加油哦！' items={items} />
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className={styles.title}>司机数量</div>
          <div className={styles.data}>{reportData?.driverCount}个</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总流水</div>
          <div className={styles.data}>{reportData?.totalMoney}元</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总订单</div>
          <div className={styles.data}>{reportData?.orderCount}单</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>开通城市</div>
          <div className={styles.data}>{reportData?.cityNum}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={getLineChartData}>
              刷新
            </Button>
          }
        >
          <div ref={lineChartRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={refreshPieChart}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieChartCityRef} className={styles.itemPie}></div>
            <div ref={pieChartAgeRef} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={getRadarChartData}>
              刷新
            </Button>
          }
        >
          <div ref={radarChartRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  );
}
