'use client';

import { getColumnsByDashboardId } from '@/api/snb/apis';
import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import ColumnCreateModal from '@/components/column/ColumnCreateModal';
import Image from 'next/image';
import Loading from './loading';
import { useColumnStore } from '@/store/ColumnStore';

const ColumnComponent = React.lazy(() => import('@/components/column/Columns'));

const DashboardDetailPage = () => {
  const params = useParams();
  const { initializeColumns, columns } = useColumnStore();
  const dashboardId = Number(params.id);
  // const [columns, setColumns] = useState<Column[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchColumns = async () => {
    if (isNaN(dashboardId)) {
      console.warn('dashboardId가 유효하지 않습니다:', params.id);
      return;
    }

    try {
      const fetched = await getColumnsByDashboardId(dashboardId);
      initializeColumns(fetched);
      // setColumns(fetched);
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
    <section className='flex grow-1 bg-gray-500 h-screen'>
      <div className='lg:flex-row lg:w-fit lg:overflow-x-scroll overflow-y-auto sm:m-[20px] flex m-[12px] flex-col w-full'>
        <Suspense fallback={<Loading />}>
          {columns.map((column) => (
            <ColumnComponent
              key={column.id}
              columnId={column.id}
              title={column.title}
              onColumnUpdate={fetchColumns}
              dashboardId={dashboardId}
            />
          ))}
        </Suspense>

        <button
          className='lg:w-[354px] lg:shrink-0 lg:mt-[60px] lg:ml-[20px] sm:mt-[20px] h-[66px] shrink-0 cursor-pointer flex justify-center items-center gap-[12px] bg-white w-full text-base border font-bold border-gray-300 mt-[16px] rounded-lg'
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
          />
        )}
      </div>
    </section>
  );
};

export default DashboardDetailPage;
