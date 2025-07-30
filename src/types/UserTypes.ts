export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserType;
}

export interface UserType {
  id: number;
  email?: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
  userId?: number; // 얘도 수정했음
}
