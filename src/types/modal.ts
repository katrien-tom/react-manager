import { MutableRefObject } from 'react';
import { UserInfo } from './user';

export type IAction = 'create' | 'edit' | 'delete';

export interface IModalProp<T = UserInfo>  {
  mRef: MutableRefObject<
    {
        // eslint-disable-next-line no-unused-vars
        open: (type: IAction, data: T) => void;
      }
    | undefined
  >;
  update: () => void;
}

export interface IDetailProp {
  mRef: MutableRefObject<{ open: (orderId: string) => void } | undefined>
}
