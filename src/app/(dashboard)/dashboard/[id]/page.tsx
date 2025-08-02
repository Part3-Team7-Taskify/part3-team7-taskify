'use client';

import { Column, getColumnsByDashboardId } from '@/api/snb/apis';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ColumnCreateModal from '@/components/column/ColumnCreateModal';
import Image from 'next/image';
import { useColumnStore } from '@/store/ColumnStore';
import { Card, GetCardApi } from '@/api/card/apis';
import Loading from './custom-loading';

const ColumnComponent = React.lazy(() => import('@/components/column/Columns'));

const DashboardDetailPage = () => {
  const params = useParams();
  const { initializeColumns, columns } = useColumnStore();
  const dashboardId = Number(params.id);
  const [cards, setCards] = useState<
    | {
        column: Column;
        cards: Card[];
      }[]
    | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchColumns = async () => {
    if (isNaN(dashboardId)) {
      console.warn('dashboardId가 유효하지 않습니다:', params.id);
      return;
    }

    try {
      const columns = await getColumnsByDashboardId(dashboardId);
      initializeColumns(columns);
      const cards = await Promise.all(
        columns.map(async (column) => {
          const cards = await GetCardApi(column.id).then((cards) => {
            return {
              column: column,
              cards: cards.cards,
            };
          });
          return cards;
        }),
      );
      setCards(cards);
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
    <section className='flex grow-1 bg-gray-500 h-full sm:p-[20px] p-[12px]'>
      <div className='lg:flex-row lg:w-fit lg:overflow-x-scroll overflow-y-auto flex flex-col w-full'>
        {cards ? (
          <>
            {cards.map((card) => (
              <ColumnComponent
                key={card.column.id}
                columnId={card.column.id}
                title={card.column.title}
                cards={card.cards}
                onColumnUpdate={fetchColumns}
                dashboardId={dashboardId}
              />
            ))}
          </>
        ) : (
          <Loading />
        )}
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
