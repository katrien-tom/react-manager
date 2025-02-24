import storage from '@/utils/storage';
import { Button } from 'antd';
export default function Welcome() {
  return (
    <>
      <Button
        onClick={() => {
          storage.set('token', '123456');
        }}
      >
        设置值
      </Button>
      <Button
        onClick={() => {
          storage.get('token');
        }}
      >
        获取值
      </Button>
      <Button
        onClick={() => {
          storage.remove('token');
        }}
      >
        删除值
      </Button>
    </>
  );
}
