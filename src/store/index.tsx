import { create } from 'zustand';
import { UserInfo } from '@/types/user';

export const useStore = create<{
  token: string;
  userInfo: UserInfo;
  updateUserInfo: (userInfo: UserInfo) => void;
}>(set => ({
  token:'',
  userInfo: {
    _id: '',
    userEmail: '',
    userName: '',
    userImg: '',
    userId: 0,
    mobile: '',
    role: 0,
    state: 0,
    createId: 0,
    deptId: '',
    deptName: '',
    job: '',
    roleList: '',
  },
  updateUserInfo: (userInfo: UserInfo) => set({ userInfo }),
}));
