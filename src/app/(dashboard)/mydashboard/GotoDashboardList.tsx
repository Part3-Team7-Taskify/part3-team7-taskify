'use client';

import { Dashboard, getDashboardsWithSize } from '@/api/snb/apis';
import AddDashboardButton from '@/components/button/AddDashboardButton';
import GotoDashboardButton from '@/components/button/GotoDashboardButton';
import { PaginationButton } from '@/components/button/PaginationButton';
import DashboardCreateModal from '@/components/DashboardCreateModal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const GotoDashboardList = () => {
  const router = useRouter();
  const [dashboards, setDashboards] = useState<Dashboard[] | null>(null);
  const [totalPage, setTotalPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const handleLeftButtonClick = async () => {
    if (currentPage <= 1) {
      return null;
    } else {
      const { dashboards: fetchedDashboards } = await getDashboardsWithSize(currentPage - 1, 5);
      setDashboards(fetchedDashboards);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleRightButtonClick = async () => {
    if (!totalPage || currentPage >= totalPage) {
      return null;
    } else {
      const { dashboards: fetchedDashboards } = await getDashboardsWithSize(currentPage + 1, 5);
      setDashboards(fetchedDashboards);
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getDashboardsWithSize(1, 5).then((res) => {
      setDashboards(res.dashboards);
      setTotalPage(res.totalCount / 5);
    });
  }, []);

  return (
    <>
      <div className='max-w-[1022px] w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-2'>
          <AddDashboardButton onClick={() => setIsVisible(true)} />
          {dashboards &&
            dashboards.map((el) => (
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
            {totalPage} 페이지 중의 {currentPage} 페이지
          </span>
          <PaginationButton
            onClickLeft={handleLeftButtonClick}
            onClickRight={handleRightButtonClick}
            isLeftDisabled={currentPage <= 1}
            isRightDisabled={currentPage >= (totalPage ?? 1)}
            size='small'
          />
        </div>
      </div>
      <DashboardCreateModal modalOpenState={isVisible} modalOpenSetState={setIsVisible} />
    </>
  );
};

export default GotoDashboardList;
