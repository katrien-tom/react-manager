import { useRef } from 'react';

import { Button, Form, Input, Modal, Space, Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { ColumnsType } from 'antd/es/table';
import roleApi from '@/api/role';
import { IAction } from '@/types/modal';
import { RoleItem, RoleSearchParams } from '@/types/role';
import CreateRole from './CreateRole';
import { message } from '@/components/AntdGlobal';
import SetPermission from './SetPermission';
export default function Role() {
  const [form] = Form.useForm();
  const roleRef = useRef<{
    open: (type: IAction, data?: RoleItem) => void;
  }>();
  const permissionRef = useRef<{
    open: (type: IAction, data?: RoleItem) => void;
  }>();
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: RoleSearchParams) => {
    return roleApi
      .getRoleList({
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

  // 创建角色
  const handleCreate = () => {
    roleRef.current?.open('create');
  };

  // 编辑角色
  const handleEdit = (data: RoleItem) => {
    roleRef.current?.open('edit', data);
  };

  // 删除角色
  const handleDelete = (_id: string) => {
    Modal.confirm({
      title: '确认',
      content: <span>确定删除该角色吗？</span>,
      onOk: async () => {
        await roleApi.deleteRole(_id);
        message.success('删除成功');
        search.submit();
      },
    });
  };

  // 设置权限
  const handlePermission = (data: RoleItem) => {
    permissionRef.current?.open('edit', data);
  };

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10,
  });
  const columns: ColumnsType<RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handlePermission(record)}>
              设置权限
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div className='roleContainer'>
      <Form form={form} className='searchForm' layout='inline'>
        <Form.Item label='角色名称' name='roleName'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered columns={columns} rowKey='_id' {...tableProps} />
      </div>
      {/* 创建角色弹窗组件 */}
      <CreateRole mRef={roleRef} update={search.submit} />
      {/* 设置权限 */}
      <SetPermission mRef={permissionRef} update={search.submit} />
    </div>
  );
}
