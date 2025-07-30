import { InvitationResponse, InvitationType } from '@/types/Invite';
import { apiClient } from '../auth/apiClient';
import { BASE_URL } from '@/constants/router';

export const getInvitationList = async (): Promise<InvitationResponse> => {
  try {
    const { data } = await apiClient.get(`${BASE_URL}/invitations`);
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
