import axios from 'axios';

/**
 * 회원가입 API 컴포넌트
 * @param {object} userData - 회원가입 데이터 (email, nickname, password)
 * @returns {Promise<any>} - API 응답 데이터
 */

interface UserData {
  email: string;
  nickname: string;
  password: string;
}

interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  // refreshToken: string;
}

async function signupAPI(userData: UserData): Promise<SignupResponse> {
  try {
    const res = await axios.post<SignupResponse>(
      'https://sp-taskify-api.vercel.app/16-7/users',
      userData,
    );
    return res.data;
  } catch (error: unknown) {
    console.error('실패:', error);
    throw error;
  }
}

export default signupAPI;
