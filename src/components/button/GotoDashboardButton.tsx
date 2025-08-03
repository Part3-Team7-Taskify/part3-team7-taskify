import ArrowIcon from '../../../public/icons/icon_arrow.svg';
import CrownIcon from '../../../public/icon/crown.svg';

const GotoDashboardButton = ({
  onClick,
  color,
  children,
  createdByMe,
}: {
  onClick: () => void;
  color: string;
  children: React.ReactNode;
  createdByMe: boolean;
}) => {
  return (
    <button
      className='w-full h-[66px] cursor-pointer px-6 flex justify-between items-center gap-3 bg-white text-base border font-bold border-gray-300 rounded-lg'
      onClick={onClick}
    >
      <div className='flex gap-2 items-center'>
        <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: color }} />
        {children}
        {createdByMe && <CrownIcon />}
      </div>
      <ArrowIcon />
    </button>
  );
};

export default GotoDashboardButton;
