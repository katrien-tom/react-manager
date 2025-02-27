import { Card, Descriptions, Button } from 'antd';
import { DescriptionsProps } from 'antd/es/descriptions';
import styles from './index.module.scss';
import { useEffect } from 'react';
import * as echarts from 'echarts';
import { useStore } from '@/store';
export default function Dashboard() {
  const { userInfo } = useStore();
  useEffect(() => {
    const lineChartDom = document.getElementById('lineChart');
    const lineChartInstance = echarts.init(lineChartDom);
    lineChartInstance.setOption({
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
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        },
        {
          name: '流水',
          type: 'line',
          data: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000],
        },
      ],
    });
    const pieChartCityDom = document.getElementById('pieChartCity');
    const pieChartCityInstance = echarts.init(pieChartCityDom);
    pieChartCityInstance.setOption({
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
          data: [
            { value: 1048, name: '成都' },
            { value: 735, name: '北京' },
            { value: 580, name: '上海' },
            { value: 484, name: '广州' },
          ],
        },
      ],
    });
    const pieChartAgeDom = document.getElementById('pieChartAge');
    const pieChartAgeInstance = echarts.init(pieChartAgeDom);
    pieChartAgeInstance.setOption({
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
          data: [
            { value: 30, name: '北京' },
            { value: 35, name: '上海' },
            { value: 40, name: '广州' },
            { value: 45, name: '深圳' },
            { value: 50, name: '成都' },
            { value: 55, name: '重庆' },
            { value: 60, name: '西安' },
            { value: 65, name: '武汉' },
            { value: 70, name: '杭州' },
          ],
        },
      ],
    });
    const radarChartDom = document.getElementById('radarChart');
    const radarChartInstance = echarts.init(radarChartDom);
    radarChartInstance.setOption({
      legend: {
        data: ['司机模型诊断'],
      },
      radar: {
        indicator: [
          { name: '服务态度', max: 10 },
          { name: '在线时长', max: 600 },
          { name: '接单率', max: 100 },
          { name: '评分', max: 5 },
          { name: '关注度', max: 10000 },
        ],
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: [
            {
              name: '司机模型诊断',
              value: [8, 300, 80, 4, 9000],
            },
          ],
        },
      ],
    });
  }, []);
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
      children: userInfo.state === 1 ? '在职' : userInfo.state === 2 ? '试用期' : '离职',
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
          <div className={styles.title}>数量</div>
          <div className={styles.data}>100个</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总流水</div>
          <div className={styles.data}>10000元</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总订单</div>
          <div className={styles.data}>2000单</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>开通城市</div>
          <div className={styles.data}>50座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div id='lineChart' className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.pieChart}>
            <div id='pieChartCity' className={styles.itemPie}></div>
            <div id='pieChartAge' className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div id='radarChart' className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  );
}
