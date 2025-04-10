import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';

import { Menu, MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';

import { useStore } from '@/store';
import styles from './index.module.scss';
import { MenuItem } from '@/types/menu';
import { IAuthLoader } from '@/router/AuthLoader';
import logoImg from '@/assets/images/logo.png';

const SideMenu = () => {
  const [menuList, setMenuList] = useState<MenuItemLocal[]>([]);
  const navigate = useNavigate();
  const collapsed = useStore(state => state.collapsed);
  const isDark = useStore(state => state.isDark);
  const data = useRouteLoaderData('layout') as IAuthLoader;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { pathname } = useLocation();
  type MenuItemLocal = Required<MenuProps>['items'][number];
  // 生成每一个菜单项
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItemLocal[],
  ): MenuItemLocal {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItemLocal;
  }
  function createIcon(name?: string) {
    if (!name) return <></>;
    const customerIcons = Icons as { [key: string]: any };
    const icon = customerIcons[name];
    if (!icon) return <></>;
    return React.createElement(icon);
  }
  // 递归生成菜单
  const getTreeMenu = (menuList: MenuItem[], treeList: MenuItemLocal[] = []) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)));
        treeList.push(
          getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || [])),
        );
      }
    });
    return treeList;
  };
  // 初始化，获取接口菜单列表数据
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList);
    setMenuList(treeMenuList);
    setSelectedKeys([pathname]);
  }, []);

  // Logo点击
  const handleClickLogo = () => {
    navigate('/welcome');
  };

  // 菜单点击
  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    navigate(key);
  };

  return (
    <div className={styles.navSide}>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src={logoImg} className={styles.img} />
        {collapsed ? '' : <span>慕慕货运</span>}
      </div>
      <Menu
        mode='inline'
        theme={isDark ? 'dark' : 'light'}
        style={{
          width: collapsed ? 80 : 'auto',
          height: 'calc(100vh - 50px)',
        }}
        selectedKeys={selectedKeys}
        onClick={handleClickMenu}
        items={menuList}
      />
    </div>
  );
};

export default SideMenu;
