'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/api/auth/apiClient';
import { useUserStore } from '@/store/LoginStore';
import ProfileSection from '@/components/ProfileSection';
import { GnbDashboard } from '@/components/gnb/Gnb';
import PasswordChangeSection from '@/components/PasswordChangeSection';

const MyPage = () => {
  const { user, addCurrentUser } = useUserStore();

  useEffect(() => {
    if (!user || user.id === 0) {
      const fetchCurrentUser = async () => {
        try {
          const response = await apiClient.get('users/me');
          console.log('현재 사용자 정보:', response.data);
          addCurrentUser(response.data);
        } catch (error: unknown) {
          console.error('❌ 사용자 정보 조회 실패:', error);
        }
      };
      fetchCurrentUser();
    }
  }, [user, addCurrentUser]);

  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    console.log('비밀번호 변경 시도');

    try {
      await apiClient.put('auth/password', {
        password: currentPassword,
        newPassword: newPassword,
      });

      console.log('✅ 비밀번호 변경 성공');
    } catch (error: unknown) {
      console.error('❌ 비밀번호 변경 실패:', error);

      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 400 || axiosError.response?.status === 401) {
        throw new Error('INVALID_CURRENT_PASSWORD');
      }

      throw error;
    }
  };

  if (!user || user.id === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col'>
      {/* 상단 GNB - 계정관리 */}
      {user && (
        <GnbDashboard
          user={{
            id: user.id,
            nickname: user.nickname,
            profileImageUrl: user.profileImageUrl || '',
            email: user.email,
            createdAt: user.createdAt || '',
            updatedAt: user.updatedAt || '',
          }}
          users={[]} // 마이페이지에는 다른 사용자 없음
          title='계정관리' // 제목을 계정관리로 설정
          createdByMe={false} // 크라운 아이콘 숨김
        />
      )}

      {/* 메인 콘텐츠 - 반응형 적용 */}
      <div className='flex-1 p-4 md:p-6 lg:p-8 bg-gray-50'>
        {/* 돌아가기 버튼 */}
        <button
          onClick={() => window.history.back()}
          className='flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 md:mb-6 transition-colors'
        >
          <span>←</span>
          <span>돌아가기</span>
        </button>

        {/* 반응형 컨테이너 - PC에서는 왼쪽 정렬 유지 */}
        <div className='w-full max-w-none md:max-w-[650px] lg:max-w-[673px] md:mx-auto lg:mx-0 space-y-6 md:space-y-8'>
          {/* 프로필 섹션 */}
          <div className='bg-white rounded-lg p-4 md:p-6 lg:p-8'>
            <h2 className='text-lg md:text-xl font-bold text-gray-900 mb-6 md:mb-8'>프로필</h2>
            <ProfileSection user={user} />
          </div>

          {/* 비밀번호 변경 섹션 */}
          <div className='bg-white rounded-lg p-4 md:p-6 lg:p-8'>
            <h2 className='text-lg md:text-xl font-bold text-gray-900 mb-6 md:mb-8'>
              비밀번호 변경
            </h2>
            <PasswordChangeSection onPasswordChange={handlePasswordChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
