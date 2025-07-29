'use client';

import { useState } from 'react';

import { postDashboard } from '@/api/snb/apis';
import { ModalRoot } from './modal/ModalRoot';
import Image from 'next/image';
import { useDashboardStore } from '@/store/DashboardStore';

const COLORS = ['#760dde', '#e876ea', '#ffa500', '#76a5ea', '#7ac555'];

type DashboardCreateModalProps = {
  modalOpenState: boolean;
  modalOpenSetState: (state: boolean) => void;
  onCreated?: () => void; // 대시보드 생성 후 콜백
};

export default function DashboardCreateModal({
  modalOpenSetState,
  modalOpenState,
  onCreated,
}: DashboardCreateModalProps) {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { addDashboard, addTotalCount } = useDashboardStore();

  const handleCreate = async () => {
    if (!title || !selectedColor) {
      alert('제목과 색상을 모두 선택해주세요!');
      return;
    }

    try {
      const newDashboard = await postDashboard({ title, color: selectedColor });
      addDashboard(newDashboard);
      addTotalCount();
      modalOpenSetState(false); // 모달 닫기
      onCreated?.(); // 대시보드 생성 후 콜백 호출)
      console.log('생성 성공:', newDashboard);
    } catch (err) {
      console.error('생성 실패:', err);
    }
  };

  return (
    <div>
      <ModalRoot
        modalButtonType='two'
        buttonCallback={handleCreate}
        modalOpenState={modalOpenState}
        modalOpenSetState={modalOpenSetState}
        title='새로운 대시보드'
      >
        <label className='block mb-2 text-sm font-medium text-gray-700'>대시보드 이름</label>
        <input
          type='text'
          className='w-full px-3 py-2 border border-gray-300 rounded-md mb-4'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='대시보드 이름'
        />

        <label className='block mb-2 text-sm font-medium text-gray-700'>색상 선택</label>
        <ul className='flex gap-2 mb-4'>
          {COLORS.map((color) => (
            <li
              key={color}
              className={`flex justify-center items-center w-8 h-8 rounded-full cursor-pointer`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            >
              {selectedColor === color && (
                <Image src={'/icons/icon_check.svg'} width={24} height={24} alt='선택된 색상' />
              )}
            </li>
          ))}
        </ul>
      </ModalRoot>
    </div>
  );
}
