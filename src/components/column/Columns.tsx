import Image from 'next/image';
import { useState } from 'react';
import ColumnEditModal from './ColumnEditModal';
import Cards from '../card/Cards';
import { Button } from '../button/Button';

import CardCreateModal from '@/components/card/CardCreateModal';
import { getCardDetailApi, Card, deleteCardApi } from '@/api/card/apis';
import CardDetailModal from '../card/CardDetailModal';
import CardEditModal from '../card/CardEditModal';

interface ColumnProps {
  title: string;
  columnId: number;
  cards: Card[];
  onColumnUpdate: () => void;
  dashboardId: number;
}

const Column = ({ title, columnId, onColumnUpdate, dashboardId, cards }: ColumnProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  // const [targetCards, setTargetCards] = useState<Card[]>([]);
  const [isCardDetailModalOpen, setIsCardDetailModalOpen] = useState<
    'detailModal' | 'editModal' | null
  >(null);
  const [targetCardData, setTargetCardData] = useState<Card | null>(null);
  const [cardId, setCardId] = useState<number>(0);

  // const fetchCards = async () => {
  //   try {
  //     const res = await GetCardApi(columnId);
  //     setTargetCards(res.cards);
  //   } catch (err) {
  //     console.error('카드 가져오기 실패:', err);
  //   }
  // };

  const openCreateCardModal = () => {
    setIsCardModalOpen(true);
  };

  // useEffect(() => {
  //   fetchCards();
  // }, [columnId]);

  const onCardEdit = () => setIsModalOpen(true);

  const onCardDetailModal = async (id: number) => {
    setCardId(id);
    try {
      const res = await getCardDetailApi(id);
      setTargetCardData(res);
      setIsCardDetailModalOpen('detailModal');
    } catch (err) {
      console.error('카드 상세 데이터 불러오기 실패:', err);
    }
  };

  const cardDeleteHandler = async () => {
    try {
      await deleteCardApi(targetCardData?.id ?? 0);
    } catch (err) {
      console.error('카드 삭제 실패:', err);
    }
  };

  return (
    <div className='lg:border-b-0 lg:border-r border-b p-[12px] border-gray-400 lg:w-[354px] lg:shrink-0'>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-[8px]'>
            <span className='bg-pri w-[8px] h-[8px] block rounded-full'></span>
            <h5 className='font-bold text-[16px]'>{title}</h5>
            <span className='bg-gray-400 text-xs text-gray-100 font-medium w-[20px] h-[20px] rounded-sm flex items-center justify-center'>
              {cards.length}
            </span>
          </div>
          <button className='cursor-pointer'>
            <Image
              src='/icons/icon_setting.svg'
              alt='컬럼 설정 아이콘'
              width={22}
              height={22}
              onClick={onCardEdit}
            />
          </button>
        </div>
        <Button
          variant='outline'
          onClick={openCreateCardModal}
          className='border-gray-300 mt-[24px] mb-[10px] flex justify-center items-center transition-shadow hover:shadow'
        >
          <Image
            src={'/icons/icon_addButton.svg'}
            width={22}
            height={22}
            alt='카드버튼추가 아이콘'
          />
        </Button>
        <div className='flex flex-col gap-[16px]'>
          {cards.map((card) => (
            <Cards
              key={card.id}
              title={card.title}
              description={card.description}
              dueDate={card.dueDate}
              tags={card.tags}
              imageUrl={card.imageUrl}
              columnId={card.columnId}
              assignee={card.assignee}
              onCardDetailClick={() => {
                onCardDetailModal(card.id);
              }}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ColumnEditModal
          title={title}
          columnId={columnId}
          modalOpenState={isModalOpen}
          modalOpenSetState={setIsModalOpen}
          onCreated={onColumnUpdate}
        />
      )}
      {isCardModalOpen && (
        <CardCreateModal
          dashboardId={dashboardId}
          modalOpenState={isCardModalOpen}
          modalOpenSetState={setIsCardModalOpen}
          onCreated={onColumnUpdate} //셍성 후 컬럼 업데이트해야함
          columnId={columnId}
        />
      )}
      {isCardDetailModalOpen && targetCardData && (
        <>
          <CardDetailModal
            modalOpenState={isCardDetailModalOpen === 'detailModal' && true}
            modalOpenSetState={(state) => {
              if (state === true) setIsCardDetailModalOpen('detailModal');
              else setIsCardDetailModalOpen(null);
            }}
            cardInfo={targetCardData}
            columnTitle={title}
            columnId={columnId}
            dashboardId={dashboardId}
            meatballEditButtonClick={() => setIsCardDetailModalOpen('editModal')}
            meatballDeleteButtonClick={cardDeleteHandler}
            onCreated={onColumnUpdate}
          />
          <CardEditModal
            modalOpenState={isCardDetailModalOpen === 'editModal' && true}
            modalOpenSetState={(state) => {
              if (state === true) setIsCardDetailModalOpen('editModal');
              else setIsCardDetailModalOpen(null);
            }}
            dashboardId={dashboardId}
            columnId={columnId}
            initialValues={targetCardData}
            cardId={cardId}
            onCreated={onColumnUpdate}
          />
        </>
      )}
    </div>
  );
};
export default Column;
