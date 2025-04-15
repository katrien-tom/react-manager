import { MenuFoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, MenuProps, Switch } from 'antd';

import { useStore } from '@/store';
import storage from '@/utils/storage';
import styles from './index.module.scss';
import BreadCrumb from './BreadCrumb';
const NavHeader = () => {
  const { userInfo } = useStore();
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
  const handleDropDown: MenuProps['onClick'] = ({ key }) => {
    if (key === 'email') {
      window.open('https://mail.qq.com/');
    } else if (key === 'logout') {
      storage.remove('token');
      location.href = '/#/login/?callback=' + encodeURIComponent(location.href);
    }
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.navLeft}>
        <MenuFoldOutlined />
        <BreadCrumb />
      </div>
      <div className={styles.navRight}>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: '10px' }} />
        <Dropdown menu={{ items: dropDownMenu, onClick: handleDropDown }} trigger={['click']}>
          <span className={styles.navNickName}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavHeader;
