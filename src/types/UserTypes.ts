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
  profileImageUrl: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}
