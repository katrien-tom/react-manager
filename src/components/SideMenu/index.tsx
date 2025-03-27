import { Menu } from 'antd';
import { DesktopOutlined, MenuOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';

const SideMenu = () => {
  const items = [
    {
      key: '1',
      label: '工作台',
      icon: <DesktopOutlined />,
    },
    {
      key: '2',
      label: '系统管理',
      icon: <SettingOutlined />,
      children: [
        {
          key: '2-1',
          label: '用户管理',
          icon: <TeamOutlined />,
        },
        {
          key: '2-2',
          label: '菜单管理',
          icon: <MenuOutlined />,
        },
        {
          key: '2-3',
          label: '角色管理',
          icon: <TeamOutlined />,
        },
        {
          key: '2-4',
          label: '部门管理',
          icon: <TeamOutlined />,
        },
      ],
    },
  ];

  return (
    <div className='sideMenu'>
      <Menu defaultSelectedKeys={['1']} mode='inline' theme='dark' items={items} />
    </div>
  );
};

export default SideMenu;
