import { Form, Input, Button, message } from 'antd';

import styles from './index.module.scss';
import { LoginForm } from '@/types/login';
import login from '@/api/login';
import storage from '@/utils/storage';

export default function Login() {
  const onFinish = async (values: LoginForm) => {
    const res = await login.login(values);
    console.log('login:', res);
    message.success('登录成功');
    storage.set('token', res.token);
    const params = new URLSearchParams(window.location.search);
    location.href = params.get('redirect') || '/#/welcome';
  };
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginWrapper}>
          <div className={styles.loginTitle}>
            <span>系统登录</span>
          </div>
          <Form name='basic' onFinish={onFinish} autoComplete='off'>
            <Form.Item<LoginForm> name='username' rules={[{ required: true, message: '请输入用户名' }]}>
              <Input />
            </Form.Item>

            <Form.Item<LoginForm> name='password' rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button type='primary' block htmlType='submit'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
