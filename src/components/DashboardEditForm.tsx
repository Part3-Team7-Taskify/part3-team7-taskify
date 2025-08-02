'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/api/auth/apiClient';
import { ModalRoot } from '@/components/modal/ModalRoot';
import { useDashboardStore } from '@/store/DashboardStore';
import Image from 'next/image';

interface DashboardEditFormProps {
  dashboardId: string;
}

const DashboardEditForm = ({ dashboardId }: DashboardEditFormProps) => {
  // 원본 데이터 (큰 제목용)
  const [originalName, setOriginalName] = useState('');

  // 수정 중인 데이터 (입력폼용)
  const [dashboardName, setDashboardName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#7AC555');

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // 모달 상태 관리
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Zustand 스토어
  const { updateDashboard } = useDashboardStore();

  const colors = [
    '#7AC555', // 초록
    '#760DDE', // 보라
    '#FFA500', // 주황
    '#76A5EA', // 파랑
    '#E876EA', // 분홍
  ];

  // 대시보드 수정하기
  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      console.log('대시보드 수정 시도:', { title: dashboardName, color: selectedColor });

      const response = await apiClient.put(`dashboards/${dashboardId}`, {
        title: dashboardName,
        color: selectedColor,
      });

      console.log('✅ 대시보드 수정 성공:', response.data);

      // 성공하면 원본 데이터도 업데이트
      setOriginalName(dashboardName);

      // Zustand 스토어 업데이트 (SNB 실시간 반영!)
      updateDashboard(parseInt(dashboardId), {
        title: dashboardName,
        color: selectedColor,
      });

      // alert → 성공 모달로 교체
      setIsSuccessModalOpen(true);
    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: unknown } };
      console.error('❌ 대시보드 수정 실패:', err);
      console.error('에러 상세:', error.response?.status, error.response?.data);

      // alert → 실패 모달로 교체
      setErrorMessage('대시보드 수정에 실패했습니다.');
      setIsErrorModalOpen(true);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`dashboards/${dashboardId}`);
        console.log('대시보드 상세:', response.data);

        // 원본과 수정용 둘 다 설정
        setOriginalName(response.data.title);
        setDashboardName(response.data.title);
        setSelectedColor(response.data.color);
      } catch (err: unknown) {
        console.error('대시보드 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [dashboardId]); // dashboardId만 의존성으로

  if (loading) {
    return (
      <div className='bg-white rounded-lg p-4 md:p-6 lg:p-8 shadow-sm w-full max-w-none md:max-w-2xl'>
        로딩 중...
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm w-full max-w-none md:max-w-2xl'>
      {/* 대시보드 이름 (큰 제목) - 원본 데이터 표시 */}
      <h1 className='text-[20px] md:text-[24px] font-bold text-gray-900 mb-[24px] md:mb-6 lg:mb-8'>
        {originalName}
      </h1>

      {/* 서브 제목 */}
      <h2 className='text-[16px] md:text-[18px] font-semibold text-gray-800 mb-4 md-[8px]'>
        대시보드 이름
      </h2>

      {/* 이름 입력 - 반응형 패딩 */}
      <div className='mb-6 md:mb-[16px]'>
        <input
          type='text'
          value={dashboardName} // 수정 중인 데이터
          onChange={(e) => setDashboardName(e.target.value)}
          className='w-full p-3 border-1 border-gray-300 rounded-lg text-base md:text-lg focus:border-pri focus:outline-none'
          placeholder='대시보드 이름을 입력하세요'
          disabled={isUpdating}
        />
      </div>

      {/* 색상 선택 - 반응형 크기 */}
      <div className='mb-8 md:mb-[40px] lg:mb-12'>
        <div className='flex gap-3 md:gap-4 justify-start'>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              disabled={isUpdating}
              className={`w-[30px] h-[30px] rounded-full relative ${
                isUpdating
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-110 transition-transform'
              }`}
              style={{ backgroundColor: color }}
            >
              {selectedColor === color && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Image
                    src={'/icons/icon_check.svg'}
                    width={24}
                    height={24}
                    alt='선택된 대시보드 색상'
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 변경 버튼 - 반응형 높이 */}
      <button
        onClick={handleUpdate}
        disabled={isUpdating || !dashboardName.trim()}
        className='w-full h-[54px] py-3 md:py-4 bg-pri text-white text-base md:text-lg font-semibold rounded-lg md:rounded-2x disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isUpdating ? '수정 중...' : '변경'}
      </button>

      {/* 성공 모달 - 피그마 스펙 적용 */}
      <ModalRoot
        modalOpenState={isSuccessModalOpen}
        modalOpenSetState={setIsSuccessModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-gray-800 text-lg'>대시보드가 성공적으로 수정되었습니다.</p>
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

      {/* 실패 모달 - 피그마 스펙 적용 */}
      <ModalRoot
        modalOpenState={isErrorModalOpen}
        modalOpenSetState={setIsErrorModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-gray-800 text-lg'>{errorMessage}</p>
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

export default DashboardEditForm;
