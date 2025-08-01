'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/api/auth/apiClient';
import { ModalRoot } from '@/components/modal/ModalRoot';
import { PaginationButton } from '@/components/button/PaginationButton';

interface Invitation {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationsSectionProps {
  dashboardId: string;
}

const InvitationsSection = ({ dashboardId }: InvitationsSectionProps) => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 표시할 초대 수

  // 초대하기 모달 상태
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  // 취소 확인 모달 상태
  const [isCancelConfirmModalOpen, setIsCancelConfirmModalOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);

  // 결과 모달 상태
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 페이지네이션 계산
  const totalPages = Math.ceil(invitations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvitations = invitations.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 초대 내역 조회
  const fetchInvitations = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`dashboards/${dashboardId}/invitations`);
      console.log('초대 내역:', response.data);
      setInvitations(response.data.invitations || []);

      // 페이지 조정 (현재 페이지가 비어있으면 이전 페이지로)
      const newTotalPages = Math.ceil((response.data.invitations?.length || 0) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error('초대 내역 조회 실패:', err);
      setInvitations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, [dashboardId]);

  // 초대 취소 버튼 클릭
  const handleCancelClick = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsCancelConfirmModalOpen(true);
  };

  // 초대 취소 실행
  const handleConfirmCancel = async () => {
    if (!selectedInvitation) return;

    try {
      setIsDeleting(selectedInvitation.id);
      setIsCancelConfirmModalOpen(false);

      await apiClient.delete(`dashboards/${dashboardId}/invitations/${selectedInvitation.id}`);

      console.log('✅ 초대 취소 성공');
      setModalMessage('초대가 성공적으로 취소되었습니다.');
      setIsSuccessModalOpen(true);

      // 초대 목록 새로고침
      fetchInvitations();
    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: unknown } };
      console.error('❌ 초대 취소 실패:', err);

      if (error.response?.status === 403) {
        setModalMessage('초대를 취소할 권한이 없습니다.');
      } else {
        setModalMessage('초대 취소에 실패했습니다.');
      }
      setIsErrorModalOpen(true);
    } finally {
      setIsDeleting(null);
      setSelectedInvitation(null);
    }
  };

  // 초대하기 실행
  const handleInvite = async () => {
    if (!inviteEmail.trim()) {
      setModalMessage('이메일을 입력해주세요.');
      setIsErrorModalOpen(true);
      return;
    }

    // 간단한 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      setModalMessage('올바른 이메일 형식을 입력해주세요.');
      setIsErrorModalOpen(true);
      return;
    }

    try {
      setIsInviting(true);

      await apiClient.post(`dashboards/${dashboardId}/invitations`, {
        email: inviteEmail,
      });

      console.log('✅ 초대 성공');
      setModalMessage(`${inviteEmail}에게 초대장이 전송되었습니다.`);
      setIsSuccessModalOpen(true);

      // 폼 초기화 및 모달 닫기
      setInviteEmail('');
      setIsInviteModalOpen(false);

      // 초대 목록 새로고침
      fetchInvitations();
    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: { message?: string } } };
      console.error('❌ 초대 실패:', err);

      if (error.response?.status === 409) {
        setModalMessage('이미 초대된 사용자입니다.');
      } else if (error.response?.status === 404) {
        setModalMessage('존재하지 않는 이메일입니다.');
      } else {
        setModalMessage('초대에 실패했습니다.');
      }
      setIsErrorModalOpen(true);
    } finally {
      setIsInviting(false);
    }
  };

  if (loading) {
    return (
      <div className='bg-white rounded-lg p-4 md:p-6 shadow-sm w-full max-w-none md:max-w-2xl lg:max-w-4xl'>
        <div className='text-center py-8 text-gray-500'>초대 내역 로딩 중...</div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg p-4 md:p-6 shadow-sm w-full max-w-none md:max-w-2xl lg:max-w-4xl'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold'>초대 내역</h2>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className='px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600'
        >
          초대하기
        </button>
      </div>

      <div className='flex justify-between items-center mb-4'>
        <span className='text-sm font-medium text-gray-700'>이메일</span>
        <div className='flex items-center gap-4'>
          <span className='text-sm text-gray-900 font-medium'>
            {totalPages > 0 ? `${currentPage} 페이지 중 ${totalPages}` : '초대 내역이 없습니다'}
          </span>

          {/* PaginationButton 컴포넌트 사용 - 반응형 적용 */}
          {totalPages > 0 && (
            <>
              {/* 모바일용 (36px) */}
              <div className='block md:hidden'>
                <PaginationButton
                  size='small'
                  onClickLeft={handlePreviousPage}
                  onClickRight={handleNextPage}
                  isLeftDisabled={currentPage === 1}
                  isRightDisabled={currentPage === totalPages}
                />
              </div>

              {/* PC/테블릿용 (40px) */}
              <div className='hidden md:block'>
                <PaginationButton
                  size='large'
                  onClickLeft={handlePreviousPage}
                  onClickRight={handleNextPage}
                  isLeftDisabled={currentPage === 1}
                  isRightDisabled={currentPage === totalPages}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 초대 내역 리스트 */}
      <div className='space-y-3'>
        {invitations.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>초대 내역이 없습니다.</div>
        ) : (
          currentInvitations.map((invitation) => (
            <div
              key={invitation.id}
              className='flex justify-between items-center p-3 border border-gray-200 rounded-lg'
            >
              <span className='text-gray-700'>{invitation.invitee.email}</span>

              {/* 취소 버튼 */}
              <button
                onClick={() => handleCancelClick(invitation)}
                disabled={isDeleting === invitation.id}
                className={`px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors ${
                  isDeleting === invitation.id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isDeleting === invitation.id ? '취소 중...' : '취소'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* 초대하기 모달 */}
      <ModalRoot
        modalOpenState={isInviteModalOpen}
        modalOpenSetState={setIsInviteModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center h-[240px] w-[400px] -m-6 p-6'>
          <h3 className='text-xl font-bold mb-4 text-center'>초대하기</h3>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>이메일</label>
            <input
              type='email'
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder='초대할 이메일을 입력하세요'
              className='w-full p-3 border border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none'
              disabled={isInviting}
            />
          </div>

          <div className='flex gap-3 mt-6'>
            <button
              onClick={() => {
                setIsInviteModalOpen(false);
                setInviteEmail('');
              }}
              disabled={isInviting}
              className='flex-1 h-[48px] border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
            >
              취소
            </button>
            <button
              onClick={handleInvite}
              disabled={isInviting || !inviteEmail.trim()}
              className='flex-1 h-[48px] bg-[#5534DA] text-white rounded-lg hover:bg-[#4a2bb8] transition-colors disabled:opacity-50'
            >
              {isInviting ? '초대 중...' : '초대하기'}
            </button>
          </div>
        </div>
      </ModalRoot>

      {/* 취소 확인 모달 */}
      <ModalRoot
        modalOpenState={isCancelConfirmModalOpen}
        modalOpenSetState={setIsCancelConfirmModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-gray-800 text-lg mb-2'>
                {selectedInvitation?.invitee.email}의 초대를 취소하시겠습니까?
              </p>
              <p className='text-gray-500 text-sm'>이 작업은 되돌릴 수 없습니다.</p>
            </div>
          </div>
          <div className='pb-6 flex gap-3'>
            <button
              onClick={() => setIsCancelConfirmModalOpen(false)}
              className='w-[115px] h-[48px] border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              아니요
            </button>
            <button
              onClick={handleConfirmCancel}
              className='w-[115px] h-[48px] bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
            >
              취소하기
            </button>
          </div>
        </div>
      </ModalRoot>

      {/* 성공 모달 */}
      <ModalRoot
        modalOpenState={isSuccessModalOpen}
        modalOpenSetState={setIsSuccessModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-gray-800 text-lg text-center'>{modalMessage}</p>
          </div>
          <div className='pb-6'>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className='w-[240px] h-[48px] bg-[#5534DA] text-white rounded-lg hover:bg-[#4a2bb8] transition-colors'
            >
              확인
            </button>
          </div>
        </div>
      </ModalRoot>

      {/* 실패 모달 */}
      <ModalRoot
        modalOpenState={isErrorModalOpen}
        modalOpenSetState={setIsErrorModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-gray-800 text-lg text-center'>{modalMessage}</p>
          </div>
          <div className='pb-6'>
            <button
              onClick={() => setIsErrorModalOpen(false)}
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

export default InvitationsSection;
