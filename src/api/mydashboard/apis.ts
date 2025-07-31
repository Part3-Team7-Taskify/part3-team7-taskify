import { InvitationResponse, InvitationType } from '@/types/Invite';
import { apiClient } from '../auth/apiClient';

export const getInvitationList = async (): Promise<InvitationResponse> => {
  try {
    const { data } = await apiClient.get(`/invitations`);
    return data;
  } catch (err) {
    console.error('초대 가져오기 실패!', err);
    throw new Error();
  }
};

export const postInvitation = async (
  dashboardId: number,
  email: string,
): Promise<InvitationType> => {
  try {
    const { data } = await apiClient.post(`/dashboards/${dashboardId}/invitations`, {
      email: email,
    });
    return data;
  } catch (err) {
    console.error('초대하기 실패!', err);
    throw new Error();
  }
};

export const postInviteAccepted = async (
  invitationId: number,
  accepted: boolean,
): Promise<InvitationType> => {
  try {
    const { data } = await apiClient.put(`/invitations/${invitationId}`, {
      inviteAccepted: accepted,
    });
    return data;
  } catch (err) {
    console.error('초대 응답 실패!', err);
    throw new Error();
  }
};
