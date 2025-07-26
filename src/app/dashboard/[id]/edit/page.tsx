'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/api/auth/apiClient';
import DashboardEditForm from '@/components/DashboardEditForm';
import MembersSection from '@/components/MembersSection';
import InvitationsSection from '@/components/InvitationsSection';
import { GnbDashboard } from '@/components/gnb/Gnb';
import SnbNav from '@/components/SnbNav';
import { useUserStore } from '@/store/LoginStore';
import { useState } from 'react';

interface DashboardInfo {
  title: string;
  createdByMe: boolean;
}

const DashboardEditPage = () => {
  const params = useParams();
  const dashboardId = params.id as string;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // Zustand 스토어 사용
  const { user, addCurrentUser } = useUserStore();

  // 실제 데이터 state들
  const [dashboardMembers, setDashboardMembers] = useState([]);
  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // 현재 사용자 정보 가져오기 (Zustand 적용)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiClient.get('users/me');
        console.log('현재 사용자 정보:', response.data);
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

  // 대시보드 정보 가져오기
  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const response = await apiClient.get(`dashboards/${dashboardId}`);
        console.log('대시보드 정보:', response.data);
        setDashboardInfo(response.data);
      } catch (err) {
        console.error('대시보드 정보 조회 실패:', err);
      }
    };
    fetchDashboardInfo();
  }, [dashboardId]);

  // 대시보드 구성원 가져오기
  useEffect(() => {
    const fetchDashboardMembers = async () => {
      try {
        const response = await apiClient.get('members', {
          params: {
            dashboardId: dashboardId, // 필수!
            page: 1, // 선택사항
            size: 20, // 선택사항
          },
        });
        console.log('대시보드 구성원:', response.data);
        setDashboardMembers(response.data.members || []);
      } catch (err) {
        console.error('구성원 조회 실패:', err);
        setDashboardMembers([]); // 에러 시 빈 배열
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardMembers();
  }, [dashboardId]);

  const handleGoBack = () => {
    router.push(`/dashboard/${dashboardId}`);
  };

  const handleDeleteDashboard = async () => {
    const confirmDelete = confirm(
      `정말로 이 대시보드를 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`,
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await apiClient.delete(`dashboards/${dashboardId}`);
      alert('대시보드가 성공적으로 삭제되었습니다.');
      router.push('/dashboard');
    } catch (err) {
      console.error('❌ 대시보드 삭제 실패:', err);
      alert('대시보드 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  // 로딩 중일 때
  if (loading || !user || user.id === 0 || !dashboardInfo) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      {/* 상단 Gnb */}
      <GnbDashboard
        user={{
          id: user.id,
          nickname: user.nickname,
          profileImageUrl: user.profileImageUrl || '',
        }}
        users={dashboardMembers}
        title={dashboardInfo.title}
        createdByMe={dashboardInfo.createdByMe}
      />

      {/* 아래 영역 */}
      <div className='flex flex-1 h-[calc(100vh-70px)]'>
        {/* 좌측 SnbNav 추가 */}
        <SnbNav />

        {/* 메인 영역 */}
        <div className='flex-1 p-8 overflow-y-auto'>
          <button
            onClick={handleGoBack}
            disabled={isDeleting}
            className='flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 disabled:opacity-50'
          >
            <span>←</span>
            <span>돌아가기</span>
          </button>

          <div className='mb-8'>
            <DashboardEditForm dashboardId={dashboardId} />
          </div>

          <div className='mb-8'>
            <MembersSection />
          </div>

          <div className='mb-8'>
            <InvitationsSection />
          </div>

          <div>
            <button
              onClick={handleDeleteDashboard}
              disabled={isDeleting}
              className='px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              {isDeleting ? '삭제 중...' : '대시보드 삭제하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEditPage;
