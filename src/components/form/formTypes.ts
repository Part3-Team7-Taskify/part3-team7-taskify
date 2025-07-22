export interface TaskFormValues {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: Date | null; // 왜 string 이지 ? Date|null
  tags: string[];
  imageUrl: string; //?? file | null 아님?
  id?: number; // 카드 id (수정 시 필요)
}

export interface Member {
  // 담당자
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface MemberListResponse {
  members: Member[];
  totalCount: number;
}
