import { Layout, theme, Watermark } from 'antd';
import { Header } from 'antd/es/layout/layout';

import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
const { Sider, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Watermark content='Ant Design'>
      <Layout>
        <Sider trigger={null} collapsible>
          <div className='demo-logo-vertical' />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, height: '64px', background: colorBgContainer }}>
            <NavHeader />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
          <Footer>
            <NavFooter />
          </Footer>
        </Layout>
      </Layout>
    </Watermark>
  );
};

export default App;
