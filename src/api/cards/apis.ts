import { apiClient } from '../auth/apiClient';

export interface members {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}
export interface MembersApiResponse {
  members: members[];
  totalCount: number;
}

export interface Me {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null; // null 가능성 명시!
  createdAt: string;
  updatedAt: string;
}

export interface CardRequest {
  assigneeUserId?: number | null;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string | null;
  colorMap?: { [tag: string]: string };
}

export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
  dashboardId?: number;
}

export interface GetCardApiResponse {
  cards: Card[];
  totalCount: number;
  cursorId: string | null;
}

const baseUrl = 'https://sp-taskify-api.vercel.app/16-7';
export const getMembersApi = async (getDashboardId: number): Promise<MembersApiResponse> => {
  try {
    const res = await apiClient.get<MembersApiResponse>(
      `${baseUrl}/members?page=1&size=5&dashboardId=${getDashboardId}`,
    );
    return res.data;
  } catch (error: unknown) {
    console.error('멤버목록 가져오기 실패:', error);
    throw error;
  }
};

export const getUserMeAPI = async (): Promise<Me> => {
  try {
    const { data } = await apiClient.get<Me>(`${baseUrl}/users/me`);
    return data;
  } catch (error) {
    console.error('내 정보 가져오기 실패:', error);
    throw error;
  }
};

export const PostCard = async (data: CardRequest): Promise<Card> => {
  try {
    const res = await apiClient.post<Card>(`${baseUrl}/cards`, data);
    return res.data;
  } catch (error: unknown) {
    console.error('카드 생성 실패:', error);
    throw error;
  }
};

export const GetCardApi = async (columnId: number): Promise<GetCardApiResponse> => {
  try {
    const { data } = await apiClient.get<GetCardApiResponse>(
      `${baseUrl}/cards?columnId=${columnId}`,
    );
    return data;
  } catch (error: unknown) {
    console.error('카드 가져오기 실패:', error);
    throw error;
  }
};
