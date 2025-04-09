import { create } from 'zustand';
import { UserInfo } from '@/types/user';
import storage from '@/utils/storage';
interface LocalState {
  token: string;
  userInfo: UserInfo;
  collapsed: boolean;
  isDark: boolean;
  updateToken: (token: string) => void;
  updateUserInfo: (userInfo: UserInfo) => void;
  updateCollapsed: () => void;
}
export const useStore = create<LocalState>(set => ({
  token: '',
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
  collapsed: false,
  isDark: storage.get('isDark') || false,
  updateToken: token => set({ token }),
  updateUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  updateCollapsed: () =>
    set(state => {
      return {
        collapsed: !state.collapsed,
      };
    }),
}));
