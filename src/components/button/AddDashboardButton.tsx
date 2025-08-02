'use client';

import AddButton from '../../../public/icons/icon_addButton.svg';

const AddDashboardButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        className='w-full h-[66px] cursor-pointer flex justify-center items-center gap-3 bg-white text-base border font-bold border-gray-300 rounded-lg'
        onClick={onClick}
      >
        새로운 대시보드
        <AddButton />
      </button>
    </>
  );
};

export default AddDashboardButton;
