import { apiClient } from '../auth/apiClient';
import { UserType } from '@/types/UserTypes';

interface MembersResponse {
  members: UserType[];
  totalCount: number;
}

export const getCurrentUser = async (): Promise<UserType> => {
  try {
    const { data } = await apiClient.get(`/users/me`);
    return data;
  } catch (err) {
    console.error('유저 가져오기 실패!', err);
    throw new Error();
  }
};

export const getMembers = async (dashboardId: number): Promise<MembersResponse> => {
  try {
    const { data } = await apiClient.get(`/members?dashboardId=${dashboardId}`);
    return data;
  } catch (err) {
    console.error('대시보드 멤버 가져오기 실패!', err);
    throw new Error();
  }
};
