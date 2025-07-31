import ArrowIcon from '../../../public/icons/icon_arrow.svg';

const GotoDashboardButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className='w-[260px] md:w-[247px] lg:w-[332px] h-[66px] cursor-pointer flex justify-between items-center gap-3 bg-white text-base border font-bold border-gray-300 rounded-lg'
      onClick={onClick}
    >
      {children}
      <ArrowIcon />
    </button>
  );
};

export default GotoDashboardButton;
