import { commentResponse, getCommentsApi } from '@/api/comments/apis';
import { ColumnChip } from '../chip/ColumnChip';
import { UserChip } from '../chip/UserChip';
import CommentsWrapper from '../comment/CommentsWrapper';
import { ModalRoot } from '../modal/ModalRoot';
import { Card } from '@/api/card/apis';
import { UserType } from '@/types/UserTypes';
import { useEffect, useState } from 'react';
import { colorMap } from '../taskform/TaskForm';

interface Props {
  modalOpenState: boolean;
  modalOpenSetState: (state: boolean) => void;
  cardInfo: Card;
  columnTitle: string;
  columnId: number;
  dashboardId: number;
  meatballEditButtonClick: () => void;
  meatballDeleteButtonClick: () => void;
  onCreated: () => void;
}

const CardDetailModal = ({
  modalOpenState,
  modalOpenSetState,
  cardInfo,
  columnTitle,
  columnId,
  dashboardId,
  meatballEditButtonClick,
  meatballDeleteButtonClick,
  onCreated,
}: Props) => {
  const assignee: UserType = cardInfo.assignee;
  const tags = cardInfo.tags;
  const [comments, setComments] = useState<commentResponse[] | null>([]);

  const getCommentsHandler = async () => {
    if (cardInfo.id == null) return; // null 또는 undefined 방어
    try {
      const res = await getCommentsApi(cardInfo.id);
      setComments(res.comments);
    } catch (err) {
      console.error('댓글 가져오기 실패:', err);
    }
  };
  useEffect(() => {
    if (modalOpenState) {
      getCommentsHandler();
    }
  }, [modalOpenState]);

  return (
    <ModalRoot
      modalButtonType='none'
      modalOpenState={modalOpenState}
      modalOpenSetState={modalOpenSetState}
      meatballMenu={true}
      meatballMenuEditCallback={meatballEditButtonClick}
      meatballMenuDeleteCallback={() => {
        meatballDeleteButtonClick();
        onCreated?.();
        modalOpenSetState(false);
      }}
    >
      <div className='flex flex-col gap-[16px] sm:min-w-[614px] min-w-[327px]'>
        <h1 className='text-xl font-bold text-black-200'>{cardInfo.title}</h1>
        <div className='flex flex-col gap-[16px] sm:flex-row-reverse sm:justify-between'>
          <div>
            {assignee && (
              <div className='sm:flex-col sm:min-w-[181px] sm:gap-[16px] border rounded-lg border-gray-300 flex justify-between px-[16px] py-[9px]'>
                <div className='flex flex-col gap-[8px]'>
                  <h4 className='font-bold text-[12px]'>담당자</h4>
                  <div className='flex items-center gap-[8px]'>
                    <UserChip user={assignee} size='small' hideName={true} />
                    <div className='text-[12px]'>{assignee.nickname}</div>
                  </div>
                </div>
                <div className='flex justify-between flex-col'>
                  <h4 className='font-bold text-[12px]'>마감일</h4>
                  <div className='text-[12px]'>{cardInfo.dueDate}</div>
                </div>
              </div>
            )}
          </div>
          <div className='flex flex-col gap-[16px]'>
            <div className='flex gap-[12px] items-center'>
              <div>
                <ColumnChip>{columnTitle}</ColumnChip>
              </div>
              {tags.length > 0 && <span className='h-[20px] w-px bg-gray-300' />}
              {tags.map((tag, index) => {
                const [color, text] = tag.split('/');
                const classes = colorMap[color] || colorMap.lime;

                return (
                  <span
                    key={index}
                    className={`rounded-sm px-[6px] py-[2px] ${classes.bg} ${classes.text} text-[12px] font-medium`}
                  >
                    {text}
                  </span>
                );
              })}
            </div>

            <div className='leading-[18px] text-[12px] w-[290px] sm:[w-420px]'>
              {cardInfo.description}
            </div>
            {cardInfo.imageUrl && (
              <div className='w-[290px] sm:w-[420px] h-[168px] flex justify-center items-center rounded-md overflow-hidden sm:h-[246px] sm:flex sm:justify-center sm:items-center'>
                <img src={cardInfo.imageUrl} alt='카드 이미지' className='w-full' />
              </div>
            )}
          </div>
        </div>
        <CommentsWrapper
          dashboardId={dashboardId}
          columnId={columnId}
          cardId={cardInfo.id}
          getCommentsHandler={getCommentsHandler}
          comments={comments}
        />
      </div>
    </ModalRoot>
  );
};

export default CardDetailModal;
