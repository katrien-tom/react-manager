import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from '@/views/common/Login';
import Welcome from '@/views/common/Welcome';
import NotFound from '@/views/common/NotFound';
import Forbidden from '@/views/common/Forbidden';
import Layout from '@/layout';
import AuthLoader from './AuthLoader';
import { lazyLoad } from './LazyLoad';
const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />,
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
        element: lazyLoad(React.lazy(() => import('@/views/dashboard'))),
      },
      {
        path: '/userList',
        element: lazyLoad(React.lazy(() => import('@/views/system/user'))),
      },
      {
        path: '/deptList',
        element: lazyLoad(React.lazy(() => import('@/views/system/dept'))),
      },
      {
        path: '/menuList',
        element: lazyLoad(React.lazy(() => import('@/views/system/menu'))),
      },
      {
        path: '/roleList',
        element: lazyLoad(React.lazy(() => import('@/views/system/role'))),
      },
      {
        path: '/orderList',
        element: lazyLoad(React.lazy(() => import('@/views/order/OrderList'))),
      },
      {
        path: '/cluster',
        element: lazyLoad(React.lazy(() => import('@/views/order/OrderCluster'))),
      },
      {
        path: '/driverList',
        element: lazyLoad(React.lazy(() => import('@/views/order/DriverList'))),
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
