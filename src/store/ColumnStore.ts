import { Column } from '@/api/snb/apis';
import { create } from 'zustand';

interface ColumnStoreType {
  columns: Column[];
  initializeColumns: (column: Column[]) => void;
  addColumns: (column: Column) => void;
}

export const useColumnStore = create<ColumnStoreType>()((set) => ({
  columns: [],
  initializeColumns: (by) => set(() => ({ columns: by })),
  addColumns: (by) => set((state) => ({ columns: [...state.columns, by] })),
}));
