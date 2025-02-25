import { MenuFoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, MenuProps, Switch } from 'antd';
import styles from './index.module.scss';

const NavHeader = () => {
  const breadList = [
    {
      title: '首页',
    },
    {
      title: '工作台',
    },
  ];
  const dropDownMenu: MenuProps['items'] = [
    {
      key: '1',
      label: '邮箱',
    },
    {
      key: '2',
      label: '退出',
    },
  ];
  return (
    <>
      <div className={styles.navHeader}>
        <div className={styles.navLeft}>
          <MenuFoldOutlined />
          <Breadcrumb items={breadList} style={{ marginLeft: '10px' }} />
        </div>
        <div className={styles.navRight}>
          <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: '10px' }} />
          <Dropdown menu={{ items: dropDownMenu }} trigger={['click']}>
            <span className={styles.navNickName}>React</span>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default NavHeader;
