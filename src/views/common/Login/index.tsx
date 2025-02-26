import { useState } from 'react';

import { Form, Input, Button } from 'antd';

import styles from './index.module.scss';
import { LoginForm } from '@/types/login';
import login from '@/api/login';
import { message } from '@/components/AntdGlobal';
import storage from '@/utils/storage';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: LoginForm) => {
    try {
      setLoading(true);
      const token = await login.login(values);
      setLoading(false);
      console.log('login-token:', token);
      message.success('登录成功');
      storage.set('token', token);
      const params = new URLSearchParams(window.location.search);
      location.href = params.get('redirect') || '/#/welcome';
    } catch (error) {
      console.log('login-error:', error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginWrapper}>
          <div className={styles.loginTitle}>
            <span>系统登录</span>
          </div>
          <Form
            name='basic'
            onFinish={onFinish}
            autoComplete='off'
            initialValues={{
              userName: 'JackMa',
              userPwd: '123456',
            }}
          >
            <Form.Item<LoginForm> name='userName' rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder='请输入用户名' />
            </Form.Item>

            <Form.Item<LoginForm> name='userPwd' rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button type='primary' block htmlType='submit' loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
