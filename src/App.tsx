import { HashRouter } from 'react-router-dom';

import { ConfigProvider, App as AntdApp } from 'antd';

import Router from '@/router';
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
          <HashRouter>
            <Router />
          </HashRouter>
        </AntdApp>
      </ConfigProvider>
    </>
  );
}
export default App;
