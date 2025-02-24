import request from '@/utils/request';
import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    request
      .post<String>('/user/login',{})
      .then(res => {
        console.log('success:', res);
      })
      .catch(err => {
        console.log('error:', err);
      });
  }, []);
  return <div>login</div>;
}
