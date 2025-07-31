import Column from '@/components/column/Columns';
import { apiClient } from '../auth/apiClient';

export interface Column {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  dashboardId: number;
}

export interface NewColumnRequest {
  title: string;
  dashboardId: number;
}
export interface EditColumnRequest {
  columnId: number;
  title: string;
}
export interface DeleteColumnRequest {
  columnId: number;
}
const baseUrl = 'https://sp-taskify-api.vercel.app/16-7';

export const postColumn = async (data: NewColumnRequest): Promise<Column> => {
  try {
    const res = await apiClient.post<Column>(`${baseUrl}/columns`, data);
    return res.data;
  } catch (error: unknown) {
    console.error('대시보드 생성 실패:', error);
    throw error;
  }
};

export const EditColumn = async (data: EditColumnRequest): Promise<Column> => {
  const { columnId, title } = data;
  const res = await apiClient.put<Column>(
    `${baseUrl}/columns/${columnId}`,
    { title }, // columnId는 URL로, title만 body로
  );
  return res.data;
};

// DeleteColumn 함수
export const deleteColumn = async ({ columnId }: DeleteColumnRequest): Promise<void> => {
  try {
    await apiClient.delete(`${baseUrl}/columns/${columnId}`);
  } catch (error) {
    console.error('컬럼 삭제 실패:', error);
    throw error;
  }
};
