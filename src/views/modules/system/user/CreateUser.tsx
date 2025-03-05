import { useState } from 'react';

import { Form, Input, Upload, Modal, Select, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/es/upload';

import storage from '@/utils/storage';
import { message } from '@/components/AntdGlobal';

const CreateUser = () => {
  const [open, setOpen] = useState(true);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const handleSubmit = async () => {
    const validate = await form.validateFields();
    console.log('submit', validate);
  };
  const handleCancel = () => {
    setOpen(false);
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
        title='创建用户'
        okText='提交'
        cancelText='取消'
        width={800}
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical' labelCol={{ span: 4 }} labelAlign='right'>
          <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
            <Input placeholder='请输入用户名称' />
          </Form.Item>
          <Form.Item label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入用户邮箱' }]}>
            <Input placeholder='请输入用户邮箱' />
          </Form.Item>
          <Form.Item label='手机号' name='mobile'>
            <Input type='number' placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请输入部门' }]}>
            <Input placeholder='请输入部门' />
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
          <Form.Item label='角色' name='roleList'>
            <Input placeholder='请输入角色' />
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
