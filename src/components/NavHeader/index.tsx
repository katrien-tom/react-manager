import { useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Switch } from 'antd';

import { useStore } from '@/store';
import storage from '@/utils/storage';
import styles from './index.module.scss';
import BreadCrumb from './BreadCrumb';
const NavHeader = () => {
  const { userInfo, collapsed, isDark, updateCollapsed, updateTheme } = useStore();
  useEffect(() => {
    handleSwitch(isDark);
  }, []);
  const dropDownMenu: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱' + userInfo.userEmail,
    },
    {
      key: 'logout',
      label: '退出',
    },
  ];
  // 控制菜单图标关闭和展开
  const toggleCollapsed = () => {
    updateCollapsed();
  };
  const handleDropDown: MenuProps['onClick'] = ({ key }) => {
    if (key === 'email') {
      window.open('https://mail.qq.com/');
    } else if (key === 'logout') {
      storage.remove('token');
      location.href = '/#/login/?callback=' + encodeURIComponent(location.href);
    }
  };
  const handleSwitch = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.dataset.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
    storage.set('isDark', isDark);
    updateTheme(isDark);
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.navLeft}>
        <div onClick={toggleCollapsed}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
        <BreadCrumb />
      </div>
      <div className={styles.navRight}>
        <Switch
          checked={isDark}
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
          onChange={handleSwitch}
        />
        <Dropdown menu={{ items: dropDownMenu, onClick: handleDropDown }} trigger={['click']}>
          <span className={styles.navNickName}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavHeader;
