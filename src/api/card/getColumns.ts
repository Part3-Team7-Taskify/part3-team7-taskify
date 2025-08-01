import { apiClient } from '@/api/auth/apiClient';

export interface Column {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

// 응답 스키마 타입
export interface GetColumnsResponse {
  result: 'SUCCESS';
  data: Column[];
}

export const getColumns = async (): Promise<Column[]> => {
  const response = await apiClient.get<GetColumnsResponse>('/columns');
  if (response.data.result !== 'SUCCESS') {
    throw new Error('콜럼 목록 조회 실패');
  }
  return response.data.data; // data 배열 반환
};
