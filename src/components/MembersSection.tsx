'use client';

import { useState } from 'react';
import { apiClient } from '@/api/auth/apiClient';
import { ModalRoot } from '@/components/modal/ModalRoot';
import { PaginationButton } from '@/components/button/PaginationButton';

interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

interface MembersSectionProps {
  dashboardId: string;
  members: Member[];
  onMembersUpdate: () => void; // 멤버 변경 시 새로고침 함수
}

const MembersSection = ({ dashboardId, members, onMembersUpdate }: MembersSectionProps) => {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 페이지당 표시할 멤버 수

  // 삭제 확인 모달 상태
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false);
  const [isDeleteErrorModalOpen, setIsDeleteErrorModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  // 페이지네이션 계산
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

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

  // 삭제 버튼 클릭 (확인 모달 표시)
  const handleDeleteClick = (member: Member) => {
    if (member.isOwner) {
      setDeleteErrorMessage('대시보드 소유자는 삭제할 수 없습니다.');
      setIsDeleteErrorModalOpen(true);
      return;
    }
    setSelectedMember(member);
    setIsConfirmModalOpen(true);
  };

  // 실제 구성원 삭제 실행
  const handleConfirmDelete = async () => {
    if (!selectedMember) return;

    try {
      setIsDeleting(selectedMember.id);
      setIsConfirmModalOpen(false);

      // 구성원 삭제 API 호출
      await apiClient.delete(`members/${selectedMember.id}`);

      console.log('✅ 구성원 삭제 성공:', selectedMember.nickname);

      // 성공 모달 표시
      setIsDeleteSuccessModalOpen(true);

      // 구성원 목록 새로고침
      onMembersUpdate();

      // 페이지 조정 (현재 페이지가 비어있으면 이전 페이지로)
      const newTotalPages = Math.ceil((members.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: unknown } };
      console.error('❌ 구성원 삭제 실패:', err);

      // 실패 모달 표시
      if (error.response?.status === 403) {
        setDeleteErrorMessage('구성원을 삭제할 권한이 없습니다.');
      } else {
        setDeleteErrorMessage('구성원 삭제에 실패했습니다.');
      }
      setIsDeleteErrorModalOpen(true);
    } finally {
      setIsDeleting(null);
      setSelectedMember(null);
    }
  };

  return (
    <div className='bg-white rounded-lg p-4 md:p-6 shadow-sm w-full max-w-none md:max-w-2xl lg:max-w-4xl'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold'>구성원</h2>
        <div className='flex items-center gap-4'>
          <span className='text-sm text-gray-900 font-medium'>
            {totalPages > 0 ? `${currentPage} 페이지 중 ${totalPages}` : '구성원이 없습니다'}
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

      {/* 구성원 리스트 */}
      <div className='space-y-4'>
        {members.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>구성원이 없습니다.</div>
        ) : (
          currentMembers.map((member) => (
            <div
              key={member.id}
              className='flex justify-between items-center p-3 border border-gray-200 rounded-lg'
            >
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                {/* 프로필 이미지 */}
                {member.profileImageUrl ? (
                  <img
                    src={member.profileImageUrl}
                    alt={`${member.nickname}의 프로필`}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                ) : (
                  <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium'>
                    {member.nickname[0]}
                  </div>
                )}

                <div className='flex flex-col min-w-0 flex-1'>
                  <div className='flex items-center gap-2 mb-1'>
                    <span className='font-medium text-sm md:text-base truncate'>
                      {member.nickname}
                    </span>
                    {member.isOwner && (
                      <span className='px-2 py-1 bg-violet-100 text-violet-700 text-xs rounded-full whitespace-nowrap'>
                        소유자
                      </span>
                    )}
                  </div>
                  <span className='text-xs md:text-sm text-violet-500 truncate'>
                    {member.email}
                  </span>
                </div>
              </div>

              {/* 삭제 버튼 */}
              <button
                onClick={() => handleDeleteClick(member)}
                disabled={isDeleting === member.id || member.isOwner}
                className={`px-3 py-1 text-xs md:text-sm border rounded transition-colors whitespace-nowrap ${
                  member.isOwner
                    ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                    : 'text-red-600 border-red-600 hover:bg-red-50'
                } ${isDeleting === member.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isDeleting === member.id ? '삭제 중...' : '삭제'}
              </button>
            </div>
          ))
        )}
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
              <p className='text-gray-800 text-lg mb-2'>
                {selectedMember?.nickname}님을 구성원에서 삭제하시겠습니까?
              </p>
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
            <p className='text-gray-800 text-lg'>구성원이 성공적으로 삭제되었습니다.</p>
          </div>
          <div className='pb-6'>
            <button
              onClick={() => setIsDeleteSuccessModalOpen(false)}
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

export default MembersSection;
