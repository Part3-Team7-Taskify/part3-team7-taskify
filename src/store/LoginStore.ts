import { UserType } from '@/types/UserTypes';
import { create } from 'zustand';

interface UserStoreType {
  user: UserType;
  addCurrentUser: (user: UserType) => void;
}

export const useUserStore = create<UserStoreType>()((set) => ({
  user: { id: 0, nickname: '', email: '', profileImageUrl: '', createdAt: '', updatedAt: '' },
  addCurrentUser: (by) => set(() => ({ user: by })),
}));
