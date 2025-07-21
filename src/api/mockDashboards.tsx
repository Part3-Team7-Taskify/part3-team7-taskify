// src/mocks/mockDashboards.ts

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

export const mockDashboardData: DashboardResponse = {
  dashboards: [
    {
      id: 15496,
      title: '여름엔 중급프로젝트를 하자',
      color: '#76a5ea',
      userId: 5934,
      createdAt: '2025-07-19T14:18:05.784Z',
      updatedAt: '2025-07-19T14:18:05.784Z',
      createdByMe: true,
    },
    {
      id: 15495,
      title: '바빠요',
      color: '#ffa500',
      userId: 5934,
      createdAt: '2025-07-19T14:16:59.001Z',
      updatedAt: '2025-07-19T14:16:59.001Z',
      createdByMe: true,
    },
    {
      id: 15494,
      title: '푸히히',
      color: '#7ac555',
      userId: 5934,
      createdAt: '2025-07-19T14:15:00.336Z',
      updatedAt: '2025-07-19T14:15:00.336Z',
      createdByMe: false,
    },
  ],
  totalCount: 3,
  cursorId: null,
};
