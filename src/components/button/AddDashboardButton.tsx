'use client';

import { useState } from 'react';
import AddButton from '../../../public/icons/icon_addButton.svg';
import InviteModal from '../modal/InviteModal';

const AddDashboardButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <button
        className='w-[260px] md:w-[247px] lg:w-[332px] h-[66px] cursor-pointer flex justify-center items-center gap-3 bg-white text-base border font-bold border-gray-300 rounded-lg'
        onClick={() => setIsVisible(true)}
      >
        새로운 대시보드
        <AddButton />
      </button>
      <InviteModal isVisible={isVisible} setIsVisible={(state) => setIsVisible(state)} />
    </>
  );
};

export default AddDashboardButton;
