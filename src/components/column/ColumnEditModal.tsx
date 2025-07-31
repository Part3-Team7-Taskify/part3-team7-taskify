import { useState } from 'react';
import { EditColumn, deleteColumn } from '@/api/dashboard/apis';
import { ModalRoot } from '../modal/ModalRoot';
interface Props {
  title: string;
  columnId: number;
  modalOpenState: boolean;
  modalOpenSetState: (state: boolean) => void;
  onCreated?: () => void;
}

const ColumnEditModal = ({
  title,
  columnId,
  modalOpenState,
  modalOpenSetState,
  onCreated,
}: Props) => {
  const [columnName, setColumnName] = useState<string>(title);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const inputChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsDuplicate(title === value);
    setColumnName(value);
  };

  const updateColumnTitle = async () => {
    try {
      await EditColumn({ columnId: columnId, title: columnName });
      modalOpenSetState(false);
      onCreated?.();
    } catch (err) {
      console.error('생성 실패:', err);
    }
  };

  const DeleteColumnheader = async () => {
    try {
      await deleteColumn({ columnId: columnId });
      onCreated?.();
      modalOpenSetState(false);
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  return (
    <>
      <ModalRoot
        title='컬럼 관리'
        modalButtonType='multi'
        modalOpenSetState={modalOpenSetState}
        modalOpenState={modalOpenState}
        buttonCallback={updateColumnTitle}
        buttonCallbackVer2={DeleteColumnheader}
      >
        <label className='block mb-2 text-sm font-medium text-gray-700'>이름</label>
        <input
          type='text'
          onChange={inputChangeValue}
          placeholder={columnName}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
        />
        <span className={`${isDuplicate ? 'block' : 'hidden'} text-red-500 text-sm py-3`}>
          중복된 컬럼 이름입니다.
        </span>
      </ModalRoot>

      {isDeleteModalOpen && (
        <ModalRoot
          title='삭제 확인'
          modalButtonType='two'
          modalOpenState={isDeleteModalOpen}
          modalOpenSetState={setIsDeleteModalOpen}
          buttonCallback={DeleteColumnheader}
        >
          <div className='text-sm text-gray-700'></div>
        </ModalRoot>
      )}
    </>
  );
};
export default ColumnEditModal;
