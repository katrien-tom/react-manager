import { useState, useRef } from 'react';

import { Button, Table, Form, Input, Select, Space, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useAntdTable } from 'ahooks';

import { UserInfo, SearchParams } from '@/types/user';
import userApi from '@/api/user';
import CreateUser from './CreateUser';
import { IAction } from '@/types/modal';
import { message } from '@/components/AntdGlobal';
import AuthButton from '@/components/AuthButton';
import SearchForm from '@/components/SearchForm';
export default function User() {
  const [form] = Form.useForm();
  const [userIds, setUserIds] = useState<number[]>([]);
  const userRef = useRef<{
    open: (type: IAction, data?: UserInfo) => void;
  }>();

  // 创建用户
  const handleCreate = () => {
    userRef.current?.open('create');
  };
  // 编辑用户
  const handleEdit = (record: UserInfo) => {
    userRef.current?.open('edit', record);
  };
  // 删除用户
  const handleDeleteConfirm = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDeleteSubmit([userId]);
      },
    });
  };
  // 批量删除
  const handleBatchDeleteConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户');
      return;
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDeleteSubmit(userIds);
      },
    });
  };

  // 公共删除用户接口
  const handleUserDeleteSubmit = async (ids: number[]) => {
    try {
      await userApi.deleteUser({
        userIds: ids,
      });
      message.success('删除成功');
      setUserIds([]);
      search.reset();
    } catch (error) {
      console.log('删除失败error：', error);
      message.error('删除成功');
    }
  };

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: SearchParams) => {
    return userApi
      .getUserList({
        ...formData,
        pageNum: current,
        pageSize: pageSize,
      })
      .then(data => {
        return {
          total: data.page.total,
          list: data.list,
        };
      });
  };

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10,
  });

  const columns: ColumnsType<UserInfo> = [
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
      render: (record: UserInfo) => (
        <Space>
          <Button type='text' onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type='text' danger onClick={() => handleDeleteConfirm(record.userId)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className='userContainer'>
      <SearchForm form={form} submit={search.submit} reset={search.reset} layout='inline'>
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
      </SearchForm>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <AuthButton auth='user@create' onClick={handleCreate}>
              新增
            </AuthButton>
            <Button
              type='primary'
              danger
              onClick={() => {
                handleBatchDeleteConfirm();
              }}
            >
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          columns={columns}
          rowKey='userId'
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[]);
            },
          }}
          {...tableProps}
        />
      </div>
      <CreateUser mRef={userRef} update={() => search.reset} />
    </div>
  );
}
