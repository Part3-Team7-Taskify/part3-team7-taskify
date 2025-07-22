export interface FormValue {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string; // 왜 string 이지 ? Date|null
  tags: string[];
  imageUrl: string; //?? file | null 아님?
}
