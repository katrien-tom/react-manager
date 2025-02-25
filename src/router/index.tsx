import { Navigate, useRoutes } from 'react-router-dom';

import Login from '@/views/common/Login';
import Welcome from '@/views/common/Welcome';
import NotFound from '@/views/common/NotFound';
import Forbidden from '@/views/common/Forbidden';
import Layout from '@/layout';
const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' replace />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
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

export default function Router() {
  return useRoutes(router);
}
