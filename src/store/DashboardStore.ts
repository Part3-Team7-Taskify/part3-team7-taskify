import { Dashboard } from '@/api/snb/apis';
import { create } from 'zustand';

interface DashboardStoreType {
  dashboards: Dashboard[];
  totalCount: number;
  initializeDashboard: (dashboard: Dashboard[]) => void;
  addDashboard: (dashboard: Dashboard) => void;
  initializeTotalCount: (count: number) => void;
  addTotalCount: () => void;
}

export const useDashboardStore = create<DashboardStoreType>()((set) => ({
  dashboards: [],
  totalCount: 0,
  initializeDashboard: (by) => set(() => ({ dashboards: by })),
  addDashboard: (by) => set((state) => ({ dashboards: [by, ...state.dashboards] })),
  initializeTotalCount: (by) => set(() => ({ totalCount: by })),
  addTotalCount: () => set((state) => ({ totalCount: state.totalCount + 1 })),
}));
