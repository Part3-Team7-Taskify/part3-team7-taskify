'use client';

import { AuthForm } from '@/components/auth/AuthForm';

const LoginPage = () => {
  return (
    <>
      <AuthForm
        title='로그인'
        apiEndpoint='auth/login'
        redirectPath='/mydashboard'
        fields={[
          { label: '이메일', name: 'email', type: 'email' },
          { label: '비밀번호', name: 'password', type: 'password' },
        ]}
        onSuccess={(data) => {
          document.cookie = `accessToken=${data.accessToken}`; // 리다이렉트 middleware용 accessToken 쿠키 저장
          // 필요 시 성공 후 별도 처리
          // addCurrentUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user)); //로컬스토리지에 유저 데이터 저장
        }}
      />
    </>
  );
};
export default LoginPage;
