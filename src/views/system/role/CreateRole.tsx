import { useImperativeHandle, useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { IAction, IModalProp } from '@/types/modal';
import { RoleItem } from '@/types/role';
import roleApi from '@/api/role';
import { message } from '@/components/AntdGlobal';
export default function CreateRole(props: IModalProp<RoleItem>) {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<IAction>('create');
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });
  const open = (type: IAction, data?: RoleItem) => {
    setVisible(true);
    setAction(type);
    if (data) {
      form.setFieldsValue(data);
    }
  };
  const [form] = Form.useForm();
  // 提交
  const handleOk = async () => {
    const valid = await form.validateFields();
    if (valid) {
      const params = form.getFieldsValue();
      if (action === 'create') {
        await roleApi.createRole(params);
      } else {
        await roleApi.editRole(params);
      }
    }
    message.success('操作成功');
    handleCancel();
    props.update();
  };
  // 取消
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  return (
    <Modal
      title={action === 'create' ? '新增角色' : '编辑角色'}
      width={600}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='角色名称' name='roleName' rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item label='备注' name='remark'>
          <Input.TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  );
}
