import { InvitationType } from '@/types/Invite';
import { create } from 'zustand';

interface InvitationStoreType {
  invitations: InvitationType[];
}

interface InvitationActionType {
  initializeInvitation: (invitations: InvitationType[]) => void;
  removeInvitation: (inviteId: number) => void;
}

export const useInvitationStore = create<InvitationStoreType & InvitationActionType>()((set) => ({
  invitations: [],
  initializeInvitation: (by) => set(() => ({ invitations: by })),
  removeInvitation: (by) =>
    set((state) => ({ invitations: state.invitations.filter((el) => el.id !== by) })),
}));
