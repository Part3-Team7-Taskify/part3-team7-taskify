export interface TaskFormValues {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string; // 왜 string 이지 ? Date|null
  tags: string[];
  imageUrl?: string | null; // 서버에 업로드한 후 저장하는 값
  imageFile?: File; // 클라이언트에서 파일 업로드 시 사용
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
