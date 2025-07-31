import { Dashboard } from '@/api/snb/apis';
import { UserType } from './UserTypes';

export interface InvitationResponse {
  cursorId: number;
  invitations: InvitationType[];
}

export interface InvitationType {
  id: number;
  inviter: UserType;
  teamId: string;
  dashboard: Dashboard;
  invitee: UserType;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}
