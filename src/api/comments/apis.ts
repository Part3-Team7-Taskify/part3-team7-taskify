import { apiClient } from '@/api/auth/apiClient';
import { UserType } from '@/types/UserTypes';

export interface commentRequest {
  content: string | null;
  cardId: number;
  columnId: number;
  dashboardId: number;
}
export interface commentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: UserType;
}
export interface GetCommentsApiResponse {
  comments: commentResponse[];
  cursorId: number | null;
}
const baseUrl = 'https://sp-taskify-api.vercel.app/16-7';
export const postCommentApi = async (data: commentRequest): Promise<commentResponse> => {
  try {
    const res = await apiClient.post<commentResponse>(`${baseUrl}/comments`, data);
    return res.data;
  } catch (error: unknown) {
    console.error('댓글 생성 실패:', error);
    throw error;
  }
};

export const getCommentsApi = async (cardId: number): Promise<GetCommentsApiResponse> => {
  try {
    const res = await apiClient.get<GetCommentsApiResponse>(
      `${baseUrl}/comments?size=10&cardId=${cardId}`,
    );
    return res.data;
  } catch (error: unknown) {
    console.error('댓글 가져오기 실패:', error);
    throw error;
  }
};

export const deleteCommentApi = async (commentId: number): Promise<void> => {
  try {
    await apiClient.delete(`${baseUrl}/comments/${commentId}`);
  } catch (error: unknown) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
};

export const editCommentApi = (commentId: number, body: { content: string }) => {
  return apiClient.put(`${baseUrl}/comments/${commentId}`, body);
};
