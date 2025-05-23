import { useEffect, useImperativeHandle, useState } from 'react';

import { Form, Input, Upload, Modal, Select, Image, TreeSelect } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/es/upload';

import storage from '@/utils/storage';
import { message } from '@/components/AntdGlobal';
import { IAction, IModalProp } from '@/types/modal';
import { UserInfo } from '@/types/user';
import userApi from '@/api/user';
import deptApi from '@/api/dept';
import roleApi from '@/api/role';

import { DeptItem } from '@/types/dept';
import { RoleItem } from '@/types/role';
const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<IAction>('create');
  const [deptList, setDeptList] = useState<DeptItem[]>([]);
  const [roleList, setRoleList] = useState<RoleItem[]>([]);
  useEffect(() => {
    getDeptList();
    getRoleList();
  }, []);

  // 获取部门列表
  const getDeptList = async () => {
    const list = await deptApi.getDeptList();
    setDeptList(list);
  };
  // 获取角色列表
  const getRoleList = async () => {
    const list = await roleApi.getAllRoleList();
    setRoleList(list);
  };

  // 暴漏子组件open方法
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });

  // 调用弹窗显示方法
  const open = (type: IAction, data?: UserInfo) => {
    setAction(type);
    setVisible(true);
    if (type === 'edit' && data) {
      form.setFieldsValue(data);
      setImgUrl(data.userImg);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setImgUrl('');
    form.resetFields();
  };

  const handleSubmit = async () => {
    const validate = await form.validateFields();
    console.log('submit', validate);
    if (validate) {
      const params = {
        ...form.getFieldsValue(),
        userImg: imgUrl,
      };
      if (action === 'create') {
        const res = await userApi.createUser(params);
        console.log('create-res:', res);
        message.success('创建成功');
      } else {
        const res = await userApi.editUser(params);
        console.log('edit-res:', res);
        message.success('编辑成功');
      }
      handleCancel();
      props.update();
    }
  };
  // 上传图片前的钩子
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('你只能上传 JPG/PNG 文件!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
      return false;
    }
    return isJpgOrPng && isLt2M;
  };
  // 上传图片后的钩子
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      // 服务端返回的数据
      const { code, data, msg } = info.file.response;
      if (code === 0) {
        message.success('上传成功');
        setImgUrl(data.url);
      } else {
        message.error(msg);
      }
    } else if (info.file.status === 'error') {
      message.error('服务异常，请稍后再试');
      setLoading(false);
    }
  };
  return (
    <div className='create-user'>
      <Modal
        title={action === 'create' ? '创建用户' : '修改用户'}
        okText='提交'
        cancelText='取消'
        width={800}
        open={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical' labelCol={{ span: 4 }} labelAlign='right'>
          <Form.Item name='userId' hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label='用户名称'
            name='userName'
            rules={[
              { required: true, message: '请输入用户名称' },
              { min: 5, max: 12, message: '用户名称最小5个字符，最大12个字符' },
            ]}
          >
            <Input placeholder='请输入用户名称' />
          </Form.Item>
          <Form.Item
            label='用户邮箱'
            name='userEmail'
            rules={[
              { required: true, message: '请输入用户邮箱' },
              { type: 'email', message: '请输入正确的邮箱' },
            ]}
          >
            <Input placeholder='请输入用户邮箱' disabled={action === 'edit'} />
          </Form.Item>
          <Form.Item
            label='手机号'
            name='mobile'
            rules={[
              { required: true, message: '请输入用户手机号' },
              { len: 11, message: '请输入11位手机号' },
              { pattern: /1[1-9]\d{9}/, message: '请输入1开头的11位手机号' },
            ]}
          >
            <Input type='number' placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请输入部门' }]}>
            <TreeSelect
              placeholder='请选择部门'
              allowClear
              treeDefaultExpandAll
              showCheckedStrategy={TreeSelect.SHOW_ALL}
              fieldNames={{ label: 'deptName', value: '_id' }}
              treeData={deptList}
            />
          </Form.Item>
          <Form.Item label='岗位' name='job'>
            <Input placeholder='请选择岗位' />
          </Form.Item>
          <Form.Item label='状态' name='state'>
            <Select placeholder='请选择状态' style={{ width: 120 }}>
              <Select.Option value={0}>所有</Select.Option>
              <Select.Option value={1}>在职</Select.Option>
              <Select.Option value={2}>离职</Select.Option>
              <Select.Option value={3}>试用期</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='系统角色' name='roleList'>
            <Select placeholder='请选择角色'>
              {roleList.map(item => {
                return (
                  <Select.Option value={item._id} key={item._id}>
                    {item.roleName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label='用户头像'>
            <Upload
              listType='picture-circle'
              showUploadList={false}
              headers={{
                Authorization: `Bearer ${storage.get('token')}`,
              }}
              action='/api/users/uploads'
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imgUrl ? (
                <Image src={imgUrl} alt='avatar' width={100} style={{ borderRadius: '50%' }} />
              ) : (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 5 }}>上传图像</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateUser;
