import { apiClient } from '@/api/auth/apiClient';

export interface UpdateCardRequestDto {
  columnId: number;
  assigneeUserId?: number | null; // nullable
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string | null;
}

export const updateCardApi = async (cardId: number | null, data: UpdateCardRequestDto) => {
  const response = await apiClient.put(`/cards/${cardId}`, data);
  return response.data;
};
