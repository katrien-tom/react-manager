import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useRouteLoaderData } from 'react-router-dom'

import { Breadcrumb } from 'antd'

import { IAuthLoader } from '@/router/AuthLoader'
import { findTreeNode } from '@/utils'

export default function BreadCrumb() {
  const { pathname } = useLocation()
  const [breadList, setBreadList] = useState<(string | ReactNode)[]>([])
  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader

  useEffect(() => {
    const list = findTreeNode(data.menuList, pathname, [])
    setBreadList([<a href='/welcome'>首页</a>, ...list])
  }, [pathname])
  return <Breadcrumb items={breadList.map(item => ({ title: item }))} style={{ marginLeft: 10 }} />
}
