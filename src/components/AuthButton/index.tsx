import { useRouteLoaderData } from 'react-router-dom';
import { IAuthLoader } from '@/router/AuthLoader';
import { Button } from 'antd';
import { useStore } from '@/store';

export default function AuthButton(props: any) {
  const data = useRouteLoaderData('layout') as IAuthLoader;
  const { role } = useStore(state => state.userInfo);
  if (!props.auth) return <Button {...props}>{props.children}</Button>;
  if (data.buttonList.includes(props.auth) || role == 1) return <Button {...props}>{props.children}</Button>;
  return <></>;
}
