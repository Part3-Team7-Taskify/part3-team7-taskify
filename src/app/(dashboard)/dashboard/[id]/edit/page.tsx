'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/api/auth/apiClient';
import DashboardEditForm from '@/components/DashboardEditForm';
import MembersSection from '@/components/MembersSection';
import InvitationsSection from '@/components/InvitationsSection';
import { ModalRoot } from '@/components/modal/ModalRoot';

interface DashboardInfo {
  title: string;
  createdByMe: boolean;
}

const DashboardEditPage = () => {
  const params = useParams();
  const dashboardId = params.id as string;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // 실제 데이터 state들
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardMembers, setDashboardMembers] = useState([]);
  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // 삭제 모달 상태 관리
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false);
  const [isDeleteErrorModalOpen, setIsDeleteErrorModalOpen] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  // 현재 사용자 정보 가져오기 (독립적)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiClient.get('users/me');
        console.log('현재 사용자 정보:', response.data);
        setCurrentUser(response.data);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
      }
    };
    fetchCurrentUser();
  }, []);

  // 대시보드 관련 정보 가져오기 (dashboardId 의존성으로 통합)
  useEffect(() => {
    if (!dashboardId) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // 병렬로 대시보드 정보와 구성원 정보 가져오기
        const [dashboardResponse, membersResponse] = await Promise.all([
          apiClient.get(`dashboards/${dashboardId}`),
          apiClient.get('members', {
            params: {
              dashboardId: dashboardId,
              page: 1,
              size: 20,
            },
          }),
        ]);

        console.log('대시보드 정보:', dashboardResponse.data);
        console.log('대시보드 구성원:', membersResponse.data);

        setDashboardInfo(dashboardResponse.data);
        setDashboardMembers(membersResponse.data.members || []);
      } catch (err) {
        console.error('대시보드 데이터 조회 실패:', err);
        // 에러 시 기본값 설정
        setDashboardInfo(null);
        setDashboardMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dashboardId]);

  // 구성원 정보 재조회 함수 (MembersSection에서 사용)
  const fetchDashboardMembers = async () => {
    try {
      const response = await apiClient.get('members', {
        params: {
          dashboardId: dashboardId,
          page: 1,
          size: 20,
        },
      });
      console.log('대시보드 구성원 재조회:', response.data);
      setDashboardMembers(response.data.members || []);
    } catch (err) {
      console.error('구성원 재조회 실패:', err);
      setDashboardMembers([]);
    }
  };

  const handleGoBack = () => {
    router.push(`/dashboard/${dashboardId}`);
  };

  // 삭제 버튼 클릭 (확인 모달 표시)
  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  // 실제 삭제 실행
  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      setIsConfirmModalOpen(false); // 확인 모달 닫기

      await apiClient.delete(`dashboards/${dashboardId}`);

      // 성공 모달 표시
      setIsDeleteSuccessModalOpen(true);
    } catch (err: unknown) {
      console.error('❌ 대시보드 삭제 실패:', err);

      // 실패 모달 표시
      setDeleteErrorMessage('대시보드 삭제에 실패했습니다.');
      setIsDeleteErrorModalOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  // 삭제 성공 후 페이지 이동
  const handleDeleteSuccess = () => {
    setIsDeleteSuccessModalOpen(false);
    router.push('/mydashboard');
  };

  // 로딩 중일 때
  if (loading || !currentUser || !dashboardInfo) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full overflow-y-scroll pb-[70px] bg-gray-50'>
      {/* 메인 콘텐츠 - 반응형 적용 */}
      <div className='p-[16px] md:p-[20px'>
        <button
          onClick={handleGoBack}
          disabled={isDeleting}
          className='flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 md:mb-6 lg:mb-8 disabled:opacity-50'
        >
          <span>←</span>
          <span>돌아가기</span>
        </button>

        <div className='mb-4 md:mb-6 lg:mb-8'>
          <DashboardEditForm dashboardId={dashboardId} />
        </div>

        <div className='mb-4 md:mb-6 lg:mb-8'>
          <MembersSection
            dashboardId={dashboardId}
            members={dashboardMembers}
            onMembersUpdate={fetchDashboardMembers}
          />
        </div>

        <div className='mb-4 md:mb-6 lg:mb-8'>
          <InvitationsSection dashboardId={dashboardId} />
        </div>

        <div>
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className='w-full h-[52px] max-w-none md:max-w-2xl md:h-[62px] hover:border-pri px-6 py-3 cursor-pointer font-medium rounded-lg border-1 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            {isDeleting ? '삭제 중...' : '대시보드 삭제하기'}
          </button>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <ModalRoot
        modalOpenState={isConfirmModalOpen}
        modalOpenSetState={setIsConfirmModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-gray-800 text-lg mb-2'>정말로 이 대시보드를 삭제하시겠습니까?</p>
              <p className='text-gray-500 text-sm'>이 작업은 되돌릴 수 없습니다.</p>
            </div>
          </div>
          <div className='pb-6 flex gap-3'>
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className='w-[115px] h-[48px] border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              취소
            </button>
            <button
              onClick={handleConfirmDelete}
              className='w-[115px] h-[48px] bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
            >
              삭제
            </button>
          </div>
        </div>
      </ModalRoot>

      {/* 삭제 성공 모달 */}
      <ModalRoot
        modalOpenState={isDeleteSuccessModalOpen}
        modalOpenSetState={setIsDeleteSuccessModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-gray-800 text-lg'>대시보드가 성공적으로 삭제되었습니다.</p>
          </div>
          <div className='pb-6'>
            <button
              onClick={handleDeleteSuccess}
              className='w-[240px] h-[48px] bg-[#5534DA] text-white rounded-lg hover:bg-[#4a2bb8] transition-colors'
            >
              확인
            </button>
          </div>
        </div>
      </ModalRoot>

      {/* 삭제 실패 모달 */}
      <ModalRoot
        modalOpenState={isDeleteErrorModalOpen}
        modalOpenSetState={setIsDeleteErrorModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-gray-800 text-lg'>{deleteErrorMessage}</p>
          </div>
          <div className='pb-6'>
            <button
              onClick={() => setIsDeleteErrorModalOpen(false)}
              className='w-[240px] h-[48px] bg-[#5534DA] text-white rounded-lg hover:bg-[#4a2bb8] transition-colors'
            >
              확인
            </button>
          </div>
        </div>
      </ModalRoot>
    </div>
  );
};

export default DashboardEditPage;
