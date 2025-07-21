'use client';
import { apiClient } from '@/api/auth/apiClient';
import { useState } from 'react';
import Image from 'next/image';
import { setAccessToken } from '@/utils/tokenhandler';
import { useRouterContext } from '@/contexts/RouterContext';

interface SignupResponse {
  accessToken: string; // 액세스 토큰 타입 명시
}

const SignupPage = () => {
  const { router } = useRouterContext();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await apiClient.post<SignupResponse>('users', {
        email,
        nickname,
        password,
      });
      //아래는 회원가입 성공 후 할 작업, userData 에서 추출한 토큰을 처리해요.
      const { accessToken } = response.data;
      //토큰 저장하기
      setAccessToken(accessToken);
      setMessage('회원가입 성공');
      //폼 초기화하기
      setEmail('');
      setNickname('');
      setPassword('');
      router.push('/dashboard'); //회원가입 성공시 로그인 상태로 대시보드로 redirection.
    } catch (error) {
      console.error('회원가입 오류:', error);
      setMessage('회원가입 실패');
    }
  };
  return (
    <>
      <Image src='/images/images_logo.png' alt='로고 이미지' width={200} height={280} />
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>이메일</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>닉네임</label>
            <input type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>
          <div>
            <label>비밀번호</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit'>가입하기</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default SignupPage;
