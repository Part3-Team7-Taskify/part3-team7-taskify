'use client';

import { useState } from 'react';
import { postColumn } from '@/api/dashboard/apis';
import { ModalRoot } from '../modal/ModalRoot';
import { useColumnStore } from '@/store/ColumnStore';

interface Props {
  dashboardId: number;
  isDuplicateColumnName: (columnName: string) => boolean;
  modalOpenSetState: (state: boolean) => void;
  modalOpenState: boolean;
  onCreated?: () => void;
}

const ColumnCreateModal = ({
  dashboardId,
  isDuplicateColumnName,
  modalOpenSetState,
  modalOpenState,
  onCreated,
}: Props) => {
  const { addColumns } = useColumnStore();
  const [columnName, setColumnName] = useState<string>('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const handleCreate = async () => {
    if (!columnName) {
      alert('컬럼 제목을 입력해주세요!');
      return;
    }
    if (isDuplicateColumnName(columnName)) {
      setIsDuplicate(true);
      return;
    }
    setIsDuplicate(false);

    try {
      if (isDuplicateColumnName(columnName)) return;
      const newColumn = await postColumn({ title: columnName, dashboardId: dashboardId });
      addColumns(newColumn);

      console.log('생성 성공:', newColumn);
      modalOpenSetState(false);
      onCreated?.();
    } catch (err) {
      console.error('생성 실패:', err);
    }
  };
  const inputChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColumnName(value);
  };

  return (
    <ModalRoot
      modalButtonType='two'
      modalOpenState={modalOpenState}
      modalOpenSetState={modalOpenSetState}
      title='새 컬럼 생성'
      buttonCallback={handleCreate}
    >
      <label className='block mb-2 text-sm font-medium text-gray-700'>이름</label>
      <input
        type='text'
        value={columnName}
        onChange={(e) => inputChangeValue(e)}
        placeholder='대시보드 이름'
        className={`${isDuplicate ? 'm-auto' : 'mb-4'} w-full px-3 py-2 border border-gray-300 rounded-md `}
      />
      <span className={`${isDuplicate ? 'block' : 'hidden'} text-err text-sm py-3`}>
        중복된 컬럼 이름입니다.
      </span>
    </ModalRoot>
  );
};
export default ColumnCreateModal;
