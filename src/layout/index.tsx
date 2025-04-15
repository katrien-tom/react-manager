import { Outlet, useRouteLoaderData, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Layout, Watermark } from 'antd';

import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import SideMenu from '@/components/SideMenu';
import user from '@/api/user';
import { useStore } from '@/store';
import styles from './index.module.scss';
import { IAuthLoader } from '@/router/AuthLoader';
import { searchRoute } from '@/utils';
import router from '@/router/index';
import TabsFC from '@/components/TabsFC';
const { Sider } = Layout;

const App: React.FC = () => {
  const { pathname } = useLocation();
  const { collapsed, userInfo, updateUserInfo } = useStore();

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const data = await user.getUserInfo();
    console.log('layout-getUserInfo:', data.userName);
    updateUserInfo(data);
  };

  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader;
  const route = searchRoute(pathname, router);
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    const staticPath = ['/welcome', '/403', '/404'];
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />;
    }
  }

  return (
    <div className='layoutContainer'>
      <Watermark content='Ant Design'>
        {/* 会被执行多次，所以需要优化 */}
        {userInfo._id ? (
          <Layout>
            <Sider collapsed={collapsed}>
              <SideMenu />
            </Sider>
            <Layout>
              <NavHeader />
              <TabsFC />
              <div className={styles.content}>
                <div className={styles.wrapper}>
                  <Outlet></Outlet>
                </div>
                <NavFooter />
              </div>
            </Layout>
          </Layout>
        ) : null}
      </Watermark>
    </div>
  );
};

export default App;
