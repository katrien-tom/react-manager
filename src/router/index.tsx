import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from '@/views/common/Login';
import Welcome from '@/views/common/Welcome';
import NotFound from '@/views/common/NotFound';
import Forbidden from '@/views/common/Forbidden';
import Layout from '@/layout';
import Dashboard from '@/views/dashboard';
import User from '@/views/system/user';
import Dept from '@/views/system/dept';
import Menu from '@/views/system/menu';
import Role from '@/views/system/role';
import AuthLoader from './AuthLoader';

const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    id: 'layout',
    path: '/',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/userList',
        element: <User />,
      },
      {
        path: '/deptList',
        element: <Dept />,
      },
      {
        path: '/menuList',
        element: <Menu />,
      },
      {
        path: '/roleList',
        element: <Role />,
      },
    ],
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/403',
    element: <Forbidden />,
  },
  {
    path: '*',
    element: <Navigate to='/404' replace />,
  },
];

export default createBrowserRouter(router);
