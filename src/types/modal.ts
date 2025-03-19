import { MutableRefObject } from 'react';
import { UserInfo } from './user';

export type IAction = 'create' | 'edit' | 'delete';

export interface IModalProp {
  mRef: MutableRefObject<
    {
        // eslint-disable-next-line no-unused-vars
        open: (type: IAction, data?: UserInfo) => void;
      }
    | undefined
  >;
  update: () => void;
}
