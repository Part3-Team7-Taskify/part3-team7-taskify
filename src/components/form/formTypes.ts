export interface TaskFormValues {
  id: number;
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string; // 왜 string 이지 ? Date|null
  tags: string[];
  imageUrl?: string | null; // 서버에 업로드한 후 저장하는 값
  imageFile?: File; // 클라이언트에서 파일 업로드 시 사용
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
  name: string;
}

export interface MemberListResponse {
  members: Member[];
  totalCount: number;
}
