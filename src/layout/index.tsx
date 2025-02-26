import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { Layout, Watermark } from 'antd';

import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import SideMenu from '@/components/SideMenu';
import user from '@/api/user';
import { useStore } from '@/store';
import styles from './index.module.scss';
import logo from '@/assets/images/logo.png';

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserInfo } = useStore();
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const data = await user.getUserInfo();
    updateUserInfo(data);
    console.log('layout-getUserInfo:', data.userName);
  };

  return (
    <div className='layoutContainer'>
      <Watermark content='Ant Design'>
        <Layout>
          <Sider trigger={null} collapsible>
            <div className={styles.logo} onClick={() => navigate('/welcome')}>
              <img src={logo} alt='logo' />
              <span>智慧园区</span>
            </div>
            <SideMenu />
          </Sider>
          <Layout>
            <NavHeader />
            <Content className={styles.content}>
              <Outlet />
            </Content>
            <NavFooter />
          </Layout>
        </Layout>
      </Watermark>
    </div>
  );
};

export default App;
