'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/api/auth/apiClient';
import { GnbMyDashboard } from '@/components/gnb/Gnb';
import SnbNav from '@/components/SnbNav';
import ProfileSection from '@/components/ProfileSection';
import PasswordChangeSection from '@/components/PasswordChangeSection';
import { useUserStore } from '@/store/LoginStore';

const MyPage = () => {
  const router = useRouter();
  const { user, addCurrentUser } = useUserStore();

  // 현재 사용자 정보 가져오기
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiClient.get('users/me');
        console.log('현재 사용자 정보:', response.data);
        // Zustand 스토어에 사용자 정보 저장
        addCurrentUser(response.data);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
      }
    };

    // 스토어에 사용자 정보가 없거나 기본값인 경우에만 API 호출
    if (!user || user.id === 0) {
      fetchCurrentUser();
    }
  }, [user, addCurrentUser]);

  const handleGoBack = () => {
    router.back();
  };

  // 프로필 저장 처리 (실제 API 연결)
  const handleProfileSave = async (nickname: string, profileImage: File | null) => {
    console.log('프로필 저장:', { nickname, profileImage });

    // ProfileSection에서 이미 API 호출을 완료했으므로
    // 여기서는 최신 사용자 정보를 다시 가져와서 스토어 업데이트
    try {
      const response = await apiClient.get('users/me');
      console.log('사용자 정보 새로고침:', response.data);
      addCurrentUser(response.data);
    } catch (err) {
      console.error('사용자 정보 새로고침 실패:', err);
    }
  };

  // 비밀번호 변경 처리 (실제 API 연결)
  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    console.log('비밀번호 변경 시도');

    try {
      await apiClient.put('auth/password', {
        password: currentPassword, // 현재 비밀번호
        newPassword: newPassword, // 새 비밀번호
      });

      console.log('✅ 비밀번호 변경 성공');
    } catch (error: unknown) {
      console.error('❌ 비밀번호 변경 실패:', error);

      // 400 에러 등을 현재 비밀번호 오류로 처리
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 400 || axiosError.response?.status === 401) {
        throw new Error('INVALID_CURRENT_PASSWORD');
      }

      throw error;
    }
  };

  // 사용자 정보가 로딩 중인 경우
  if (!user || user.id === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div>사용자 정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      {/* 상단 Gnb */}
      <GnbMyDashboard
        user={{
          id: user.id,
          nickname: user.nickname,
          profileImageUrl: user.profileImageUrl || '',
        }}
      />

      {/* 아래 영역 */}
      <div className='flex flex-1 h-[calc(100vh-70px)]'>
        {/* 좌측 SnbNav */}
        <SnbNav />

        {/* 메인 영역 */}
        <div className='flex-1 p-8 overflow-y-auto'>
          {/* 돌아가기 버튼 */}
          <button
            onClick={handleGoBack}
            className='flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8'
          >
            <span>←</span>
            <span>돌아가기</span>
          </button>

          {/* 프로필, 비밀번호 변경 섹션 */}
          <ProfileSection user={user} onSave={handleProfileSave} />
          <PasswordChangeSection onPasswordChange={handlePasswordChange} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
