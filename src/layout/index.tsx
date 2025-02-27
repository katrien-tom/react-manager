import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useCallback } from 'react';

import { Layout, Watermark } from 'antd';

import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import SideMenu from '@/components/SideMenu';
import user from '@/api/user';
import { useStore } from '@/store';
import styles from './index.module.scss';
import logo from '@/assets/images/logo.png';

const { Sider } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserInfo } = useStore();

  const getUserInfo = useCallback(async () => {
    const data = await user.getUserInfo();
    updateUserInfo(data);
    console.log('layout-getUserInfo:', data.userName);
  }, [updateUserInfo]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

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
            <div className={styles.content}>
              <Outlet />
            </div>
            <NavFooter />
          </Layout>
        </Layout>
      </Watermark>
    </div>
  );
};

export default App;
