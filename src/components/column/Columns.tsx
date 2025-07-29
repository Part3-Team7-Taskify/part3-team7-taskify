import Image from 'next/image';
import { useEffect, useState } from 'react';
import ColumnEditModal from './ColumnEditModal';
import Cards from '../card/Cards';
import { Button } from '../button/Button';
import CardCreateModal from '../card/CardCreateModal';
import { GetCardApi, Card } from '@/api/card/apis';

interface ColumnProps {
  title: string;
  columnId: number;
  onColumnUpdate: () => void;
  dashboardId: number;
}

const Column = ({ title, columnId, onColumnUpdate, dashboardId }: ColumnProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  const [targetCards, setTargetCards] = useState<Card[]>([]);

  const onColumnEdit = () => {
    //모달창 띄우기
    setIsModalOpen(true);
  };
  const fetchCards = async () => {
    try {
      const res = await GetCardApi(columnId);
      setTargetCards(res.cards);
    } catch (err) {
      console.error('카드 가져오기 실패:', err);
    }
  };

  const openCreateCardModal = () => {
    setIsCardModalOpen(true);
  };

  useEffect(() => {
    fetchCards();
  }, [columnId]);

  const onCardCreate = () => {
    //
    console.log('카드 생성 모달 띄우기');
    fetchCards();
    setIsCardModalOpen(true);
  };

  return (
    <div className='lg:border-b-0 lg:border-r border-b p-[12px] border-gray-400 lg:w-[354px] lg:shrink-0'>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-[8px]'>
            <span className='bg-pri w-[8px] h-[8px] block rounded-full'></span>
            <h5 className='font-bold text-[16px]'>{title}</h5>
            <span className='bg-gray-400 text-xs text-gray-100 font-medium w-[20px] h-[20px] rounded-sm flex items-center justify-center'>
              0
            </span>
          </div>
          <button className='cursor-pointer'>
            <Image
              src='/icons/icon_setting.svg'
              alt='컬럼 설정 아이콘'
              width={22}
              height={22}
              onClick={onColumnEdit}
            />
          </button>
        </div>
        <Button
          type='outline'
          onClick={openCreateCardModal}
          className='border-gray-300 mt-[24px] mb-[10px] flex justify-center items-center '
        >
          <Image
            src={'/icons/icon_addButton.svg'}
            width={22}
            height={22}
            alt='카드버튼추가 아이콘'
          />
        </Button>
        <div className='flex flex-col gap-[16px]'>
          {targetCards.map((card) => {
            return (
              <Cards
                key={card.id}
                title={card.title}
                description={card.description}
                dueDate={card.dueDate}
                tags={card.tags}
                imageUrl={card.imageUrl}
                columnId={card.columnId}
                assignee={card.assignee}
              />
            );
          })}
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
          onCreated={onCardCreate}
          columnId={columnId}
        />
      )}
    </div>
  );
};
export default Column;
