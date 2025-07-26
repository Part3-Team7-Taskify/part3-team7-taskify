'use client';

import { getColumnsByDashboardId, Column } from '@/api/snb/apis';
import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import ColumnCreateModal from '@/components/column/ColumnCreateModal';
import Image from 'next/image';
import Loading from './loading';

const ColumnComponent = React.lazy(() => import('@/components/column/Columns'));

const DashboardDetailPage = () => {
  const params = useParams();
  const dashboardId = Number(params.id);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchColumns = async () => {
    if (isNaN(dashboardId)) {
      console.warn('dashboardId가 유효하지 않습니다:', params.id);
      return;
    }

    try {
      const fetched = await getColumnsByDashboardId(dashboardId);
      setColumns(fetched);
    } catch (err) {
      console.error('컬럼 가져오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, [dashboardId, params.id]);

  const handleNewColumnAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const isDuplicateColumnName = (columnName: string) => {
    const pattern = /[a-zA-Z]/;
    if (!pattern.test(columnName)) {
      return columns.some((column) => column.title === columnName);
    }
    return columns.some((column) => column.title.toUpperCase() === columnName.toUpperCase());
  };

  return (
    <section className='flex bg-gray-500 h-screen'>
      <div className='lg:flex-row lg:w-fit lg:overflow-x-scroll sm:m-[20px] flex m-[12px] flex-col w-full'>
        <Suspense fallback={<Loading />}>
          {columns.map((column) => (
            <ColumnComponent
              key={column.id}
              columnId={column.id}
              title={column.title}
              onColumnUpdate={fetchColumns}
            />
          ))}
        </Suspense>

        <button
          className='lg:w-[354px] lg:shrink-0 lg:mt-[60px] lg:ml-[20px] sm:mt-[20px] cursor-pointer flex justify-center items-center gap-[12px] bg-white w-full h-[66px] text-base border font-bold border-gray-300 mt-[16px] rounded-lg'
          onClick={handleNewColumnAdd}
        >
          새로운 칼럼 추가하기
          <Image
            src='/icons/icon_columnAdd.svg'
            width={20}
            height={20}
            alt='새로운 컬럼 추가하는 버튼'
          />
        </button>

        {isModalOpen && (
          <ColumnCreateModal
            isDuplicateColumnName={isDuplicateColumnName}
            dashboardId={dashboardId}
            modalOpenSetState={setIsModalOpen}
            modalOpenState={isModalOpen}
            onCreated={fetchColumns} // 성공시 재호출
          />
        )}
      </div>
    </section>
  );
};

export default DashboardDetailPage;
