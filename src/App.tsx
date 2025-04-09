import {RouterProvider } from 'react-router-dom';

import { ConfigProvider, App as AntdApp } from 'antd';

import router from './router';
import AntdGlobal from '@/components/AntdGlobal';
import './App.scss';

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ed6c00',
          },
        }}
      >
        <AntdApp>
          <AntdGlobal />
          <RouterProvider router={router} />
        </AntdApp>
      </ConfigProvider>
    </>
  );
}
export default App;
