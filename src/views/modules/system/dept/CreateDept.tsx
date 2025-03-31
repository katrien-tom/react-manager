import { useEffect, useImperativeHandle, useState } from 'react';

import { Modal, Form, TreeSelect, Input, Select } from 'antd';

import { IAction, IModalProp } from '@/types/modal';
import { DeptItem, EditDeptParam } from '@/types/dept';
import { useForm } from 'antd/es/form/Form';
import deptApi from '@/api/dept';
import userApi from '@/api/user';
import { UserInfo } from '@/types/user';
import { message } from '@/components/AntdGlobal';

export default function CreateDept(props: IModalProp) {
  const [form] = useForm();
  const [action, setAction] = useState<IAction>('create');
  const [visible, setVisible] = useState(false);
  const [deptList, setDeptList] = useState<DeptItem[]>([]);
  const [userList, setUserList] = useState<UserInfo[]>([]);

  useEffect(() => {
    getAllUserList();
  }, []);

  const getDeptList = async () => {
    const data = await deptApi.getDeptList();
    setDeptList(data);
  };

  const getAllUserList = async () => {
    const data = await userApi.getAllUserList();
    setUserList(data);
  };

  useImperativeHandle(props.mRef, () => ({
    open,
  }));
  // 打开弹窗函数
  const open = (type: IAction, data?: EditDeptParam | { parentId: string }) => {
    setAction(type);
    setVisible(true);
    getDeptList();
    if (data) {
      form.setFieldsValue(data);
    }
  };
  // 部门提交
  const handleSubmit = async () => {
    const valid = await form.validateFields();
    if (valid) {
      if (action === 'create') {
        await deptApi.createDept(form.getFieldsValue());
      } else {
        await deptApi.editDept(form.getFieldsValue());
      }
      message.success('操作成功');
      handleCancel();
      props.update();
    }
  };
  // 关闭和重置表单
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择上级部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请选择负责人' }]}>
          <Select>
            {userList.map(item => {
              return (
                <Select.Option value={item.userName} key={item._id}>
                  {item.userName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
