// src/app/dashboard/[id]/SnbNav.tsx
'use client';
import { useEffect, useState } from 'react';
import { getDashboards } from '@/api/snb/apis';
import Image from 'next/image';
import { useRouterContext } from '@/contexts/RouterContext';
import DashboardCreateModal from './DashboardCreateModal';
import { useDashboardStore } from '@/store/DashboardStore';
import { PaginationButton } from './button/PaginationButton';

const SnbNav = () => {
  const [selectDashboard, setSelectDashboard] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const { router } = useRouterContext();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const { initializeDashboard, initializeTotalCount, dashboards, totalCount } = useDashboardStore();
  const totalPages = Math.ceil(totalCount / perPage);

  // 대시보드 데이터를 가져오는 함수 (재사용을 위해 분리)
  const fetchDashboards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboards(1);
      initializeDashboard(data.dashboards);
      initializeTotalCount(data.totalCount);
      console.log('대시보드 데이터 불러오기 완료');
    } catch (err) {
      setError('대시보드 데이터를 불러오는 데 실패했어요.');
      console.error('대시보드 데이터 불러오기 실패:', err);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };
  const goToPrevPage = async () => {
    if (page <= 1) {
      return null;
    } else {
      const { dashboards } = await getDashboards(page - 1);
      initializeDashboard(dashboards);
      setPage((prev) => prev - 1);
    }
  };

  const goToNextPage = async () => {
    if (page >= totalPages) {
      return null;
    } else {
      const { dashboards } = await getDashboards(page + 1);
      initializeDashboard(dashboards);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

  const handleDashboardClick = (id: number) => {
    setSelectDashboard(id);
    router.push(`/dashboard/${id}`);
  };

  const handleNewDashboardAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('대시보드를 추가하는 모달이 띄워져야함');
    setIsModalOpen(true);
  };

  // 모달이 닫히고 새 대시보드가 성공적으로 추가되었을 때 호출될 함수
  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  //   fetchDashboards();
  //   // if (didAddSuccessfully) {
  //   //   // 새 대시보드가 추가되었다면 목록을 새로고침
  //   //   fetchDashboards();
  //   // }
  // };

  if (loading) {
    return (
      <nav className='flex flex-col items-center justify-center h-screen bg-white transition-[width] ease-in-out sm:w-[160px] lg:w-[300px] w-[68px] border-r-1 border-gray-300'>
        <p className='text-gray-500'>대시보드 목록 로딩 중...</p>
      </nav>
    );
  }

  if (error) {
    return (
      <nav className='flex flex-col items-center justify-center h-screen bg-white transition-[width] ease-in-out sm:w-[160px] lg:w-[300px] w-[68px] border-r-1 border-gray-300'>
        <p className='text-red-500'>오류: {error}</p>
      </nav>
    );
  }

  return (
    <aside>
      <nav className='transition-[width] ease-in-out bg-white sm:w-[160px] lg:w-[300px] sm:items-start sm:px-[13px] sm:h-full flex flex-col gap-[17px] items-center w-[68px] px-[12px] py-[20px] h-screen border-r-1 border-gray-300'>
        <h1>
          <Image
            src='/icons/icon_snbTaskifyMOLogo.svg'
            alt='Taskify Mobile Logo'
            width={41}
            height={28}
            priority
            className='sm:hidden'
          />
          <Image
            src='/icons/icon_snbTaskifyLogo.svg'
            alt='Taskify Desktop Logo'
            width={108.8}
            height={33.07}
            priority
            className='hidden sm:block'
          />
        </h1>
        <div className='flex justify-center items-center w-full sm:justify-between'>
          <h5 className='hidden sm:block text-sm text-sec-gray-300 font-semibold'>Dash Boards</h5>
          <button className='cursor-pointer' onClick={handleNewDashboardAdd}>
            <Image
              src='/icons/icon_dashboardAdd.svg'
              alt='Add Dashboard'
              aria-label='새로운 대시보드 추가'
              width={24}
              height={24}
              className='w-[24px] h-[24px] sm:hidden'
            />
            <Image
              src='/icons/icon_dashboardAdd.svg'
              alt='Add Dashboard'
              aria-label='새로운 대시보드 추가'
              width={20}
              height={20}
              className='hidden sm:block sm:w-[20px] sm:h-[20px]'
            />
          </button>
        </div>

        <ul className='flex flex-col gap-[14px] sm:gap-[4px] w-full'>
          {dashboards.map((dashboard) => (
            <li
              key={dashboard.id}
              onClick={() => handleDashboardClick(dashboard.id)}
              className={`p-[16px] text-sec-gray-300 font-medium cursor-pointer sm:pl-[10px] sm:py-[8.5px] rounded-sm hover:bg-pri-bg-soft ${
                selectDashboard === dashboard.id ? 'bg-pri-bg-soft' : ''
              }`}
            >
              <div className='flex justify-center items-center gap-[14px] sm:justify-start'>
                <span
                  className='w-[8px] h-[8px] rounded-full block'
                  style={{ backgroundColor: dashboard.color }}
                ></span>

                <div className='hidden sm:flex items-center gap-[4px]'>
                  <span className='transition-[width] w-full sm:w-[75px] overflow-hidden text-ellipsis whitespace-nowrap lg:w-full'>
                    {dashboard.title}
                  </span>
                  {dashboard.createdByMe && (
                    <span>
                      <Image
                        src='/icons/icon_crown.svg'
                        alt='왕관 아이콘'
                        width={15.08}
                        height={12}
                      />
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className='hidden sm:flex mt-[11px]'>
          <PaginationButton
            onClickLeft={goToPrevPage}
            onClickRight={goToNextPage}
            isLeftDisabled={page === 1}
            isRightDisabled={totalPages === page}
          />
        </div>
      </nav>
      {/* TestModal에 onClose와 함께 onDashboardAdded 콜백 추가 */}
      {isModalOpen && (
        <DashboardCreateModal modalOpenState={isModalOpen} modalOpenSetState={setIsModalOpen} />
      )}
    </aside>
  );
};

export default SnbNav;
