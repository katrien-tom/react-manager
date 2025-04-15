import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, App as AntdApp, theme } from 'antd';

import router from './router';
import AntdGlobal from '@/components/AntdGlobal';
import './style/theme.scss';
import './App.scss';
import { useStore } from '@/store';

function App() {
  const { isDark } = useStore();
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ed6c00',
          },
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
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
