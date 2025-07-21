import axios from 'axios';

/**
 * 로그인 API 컴포넌트
 * @param {object} userData - 로그인 데이터 (email, password)
 * @returns {Promise<any>} - API 응답 데이터
 */

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: 'string';
    createdAt: '2025-07-19T17:20:39.883Z';
    updatedAt: '2025-07-19T17:20:39.883Z';
  };
}

async function loginAPI(userData: LoginRequest): Promise<LoginResponse> {
  try {
    const res = await axios.post<LoginResponse>(
      'https://sp-taskify-api.vercel.app/16-7/auth/login',
      userData,
    );
    return res.data;
  } catch (error) {
    console.error('실패:', error);
    throw error;
  }
}

export default loginAPI;
