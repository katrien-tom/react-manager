import { useEffect, useRef, useState } from 'react';

import { Button, Form, Input, Modal, Select, Space, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';

import menuApi from '@/api/menu';
import { IAction } from '@/types/modal';
import { ColumnsType } from 'antd/es/table';
import { message } from '@/components/AntdGlobal';
import { EditMenuParams, MenuItem } from '@/types/menu';
import CreateMenu from './CreateMenu';

export default function Menu() {
  const [form] = useForm();
  const [data, setData] = useState<MenuItem[]>([]);

  const menuRef = useRef<{
    open: (type: IAction, data?: EditMenuParams | { parentId?: string; orderBy?: number }) => void;
  }>();

  useEffect(() => {
    getMenuList();
  }, []);

  // 获取菜单列表
  const getMenuList = async () => {
    const data = await menuApi.getMenuList(form.getFieldsValue());
    setData(data);
  };
  // 重置
  const handleReset = () => {
    form.resetFields();
    getMenuList();
  };
  // 创建菜单
  const handleCreate = () => {
    menuRef.current?.open('create', { orderBy: data.length });
  };
  // 创建菜单
  const handleSubCreate = (record: MenuItem) => {
    menuRef.current?.open('create', { parentId: record._id, orderBy: record.children?.length });
  };
  // 编辑菜单
  const handleEdit = (record: MenuItem) => {
    menuRef.current?.open('edit', record);
  };

  // 删除菜单
  const handleDelete = (record: MenuItem) => {
    let text = '';
    if (record.menuType == 1) text = '菜单';
    if (record.menuType == 2) text = '按钮';
    if (record.menuType == 3) text = '页面';
    Modal.confirm({
      title: '确认',
      content: `确认删除该${text}吗？`,
      onOk() {
        handleDeleteSubmit(record._id);
      },
    });
  };
  // 删除提交
  const handleDeleteSubmit = async (_id: string) => {
    await menuApi.deleteMenu({ _id });
    message.success('删除成功');
    getMenuList();
  };

  const columns: ColumnsType<MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面',
        }[menuType];
      },
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDelete(record)} danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div className='menuContainer'>
      <Form className='searchForm' layout='inline' form={form} initialValues={{ menuState: 1 }}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' style={{ marginRight: 10 }} onClick={getMenuList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false}></Table>
      </div>
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  );
}
