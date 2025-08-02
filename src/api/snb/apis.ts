import { apiClient } from '@/api/auth/apiClient';
// 타입 정의
export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export interface DashboardResponse {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: number | null;
}

export interface Column {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  dashboardId: number;
}

export interface ColumnsResponse {
  result: string;
  data: Column[];
}

export interface NewDashboardRequest {
  title: string;
  color: string;
}
const baseUrl = 'https://sp-taskify-api.vercel.app/16-7';
export const getDashboards = async (pageParam: number): Promise<DashboardResponse> => {
  try {
    const res = await apiClient.get<DashboardResponse>(
      `${baseUrl}/dashboards?navigationMethod=pagination&page=${pageParam}`,
    );
    return res.data;
  } catch (error: unknown) {
    console.error('대시보드 가져오기 실패:', error);
    throw error;
  }
};

export const getDashboardsWithSize = async (
  pageParam: number,
  size: number,
): Promise<DashboardResponse> => {
  try {
    const res = await apiClient.get<DashboardResponse>(
      `${baseUrl}/dashboards?navigationMethod=pagination&size=${size}&page=${pageParam}`,
    );
    return res.data;
  } catch (error: unknown) {
    console.error('대시보드 가져오기 실패:', error);
    throw error;
  }
};

export const getSingleDashboard = async (dashboardId: number): Promise<Dashboard> => {
  try {
    const { data } = await apiClient.get(`${baseUrl}/dashboards/${dashboardId}`);
    return data;
  } catch (err: unknown) {
    console.error('대시보드 가져오기 실패:', err);
    throw new Error();
  }
};

export const postDashboard = async (data: NewDashboardRequest): Promise<Dashboard> => {
  try {
    const res = await apiClient.post<Dashboard>(
      `${baseUrl}/dashboards?navigationMethod=pagination&page=1`,
      data, // 요청 바디: { title, color }
    );
    return res.data;
  } catch (error: unknown) {
    console.error('대시보드 생성 실패:', error);
    throw error;
  }
};

export const getColumnsByDashboardId = async (dashboardId: number): Promise<Column[]> => {
  try {
    const res = await apiClient.get<ColumnsResponse>(
      `${baseUrl}/columns?dashboardId=${dashboardId}`,
    );
    return res.data.data;
  } catch (error: unknown) {
    console.error('컬럼 가져오기 실패:', error);
    throw error;
  }
};
