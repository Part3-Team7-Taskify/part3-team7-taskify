'use client';

import AddDashboardButton from '@/components/button/AddDashboardButton';
import GotoDashboardButton from '@/components/button/GotoDashboardButton';
import { PaginationButton } from '@/components/button/PaginationButton';
import DashboardCreateModal from '@/components/DashboardCreateModal';
import { useDashboardStore } from '@/store/DashboardStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const GotoDashboardList = () => {
  const router = useRouter();
  const { dashboards } = useDashboardStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleLeftButtonClick = () => {
    setCurrentPage((prev) => {
      if (prev <= 1) return 1;
      else return prev - 5;
    });
  };

  const handleRightButtonClick = () => {
    setCurrentPage((prev) => {
      if (prev >= dashboards.length) return prev;
      else return prev + 5;
    });
  };

  return (
    <>
      <div className='max-w-[1022px]'>
        <div className='grid grid-cols-3 grid-rows-2 gap-2'>
          <AddDashboardButton onClick={() => setIsVisible(true)} />
          {dashboards.slice(currentPage, currentPage + 5).map((el) => (
            <GotoDashboardButton
              key={el.id}
              onClick={() => router.push(`/dashboard/${el.id}`)}
              color={el.color}
              createdByMe={el.createdByMe}
            >
              {el.title}
            </GotoDashboardButton>
          ))}
        </div>
        <div className='flex justify-end items-center gap-2 mt-2'>
          <span>
            {currentPage === 0 ? 1 : (currentPage + 5) / 5} 페이지 중의{' '}
            {dashboards.length <= 5 ? 1 : dashboards.length / 5}
          </span>
          <PaginationButton
            onClickLeft={handleLeftButtonClick}
            onClickRight={handleRightButtonClick}
            isLeftDisabled={currentPage <= 0 && true}
            isRightDisabled={currentPage + 5 >= dashboards.length && true}
            size='small'
          />
        </div>
      </div>
      <DashboardCreateModal modalOpenState={isVisible} modalOpenSetState={setIsVisible} />
    </>
  );
};

export default GotoDashboardList;
