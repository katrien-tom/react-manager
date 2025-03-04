import { useEffect, useState } from 'react';

import { Button, Table, Form, Input, Select, Space } from 'antd';
import { ColumnType } from 'antd/es/table';

import { UserInfo } from '@/types/user';
import userApi from '@/api/user';
import { PageParams } from '@/types/api';
import CreateUser from './CreateUser';
export default function User() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<UserInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    });
  }, [pagination.current,pagination.pageSize]);
  // 搜索
  const handleSearch = () => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  // 重置表单
  const handleReset = () => {
    form.resetFields();
  };
  // 获取用户列表
  const getUserList = async (pageParams: PageParams) => {
    const params = form.getFieldsValue();
    const data = await userApi.getUserList({
      ...params,
      ...pageParams,
    });
    const newDataList = Array.from({ length: 50 })
      .fill({})
      .map((item: any) => {
        item = {
          ...data.list[0],
        };
        item.userId = Math.random();
        return item;
      });
    setData(newDataList);
    setTotal(newDataList.length);
    setPagination({
      current: data.page.pageNum,
      pageSize: data.page.pageSize,
    });
  };

  const columns: ColumnType<UserInfo>[] = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render: (text: number) => {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户',
        }[text];
      },
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render: (text: number) => {
        return {
          1: '在职',
          2: '离职',
          3: '试用期',
        }[text];
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type='text'>编辑</Button>
          <Button type='text' danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className='userContainer'>
      <Form className='searchForm' layout='inline' form={form}>
        <Form.Item label='用户ID' name='userId'>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item label='用户名称' name='userName'>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select placeholder='请选择状态' style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}>
              搜索
            </Button>
            <Button type='default' onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={() => setOpen(true)}>新增</Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowSelection={{ type: 'checkbox' }}
          dataSource={data}
          columns={columns}
          rowKey='userId'
          pagination={{
            position: ['bottomRight'],
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
            showTotal: (total) => `共${total}条`,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize: pageSize,
              });
            },
          }}
        />
        ;
      </div>
      <CreateUser/>
    </div>
  );
}
