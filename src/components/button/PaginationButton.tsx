export const PaginationButton = ({
  onClickLeft,
  onClickRight,
  isLeftDisabled = false,
  isRightDisabled = false,
  size = 'large', // 'small' (36px) | 'large' (40px)
}: {
  onClickLeft?: () => void;
  onClickRight?: () => void;
  isLeftDisabled?: boolean;
  isRightDisabled?: boolean;
  size?: 'small' | 'large';
}) => {
  // 크기별 클래스
  const sizeClasses = size === 'small' ? 'w-9 h-9' : 'w-10 h-10';

  return (
    <div className='flex items-center'>
      {/* 왼쪽 버튼 - 좌상단, 좌하단만 radius */}
      <button
        className={`
          ${sizeClasses} flex items-center justify-center
          border border-gray-300 rounded-l-[4px]
          transition-all duration-200
          ${
            isLeftDisabled
              ? 'cursor-not-allowed bg-gray-50'
              : 'cursor-pointer bg-white hover:bg-gray-50 hover:border-gray-400'
          }
        `}
        onClick={onClickLeft}
        disabled={isLeftDisabled}
        style={{
          color: isLeftDisabled ? '#D9D9D9' : '#333236',
        }}
      >
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='rotate-180'>
          <path
            d='M6 12L10 8L6 4'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {/* 오른쪽 버튼 - 우상단, 우하단만 radius */}
      <button
        className={`
          ${sizeClasses} flex items-center justify-center
          border border-gray-300 border-l-0 rounded-r-[4px]
          transition-all duration-200
          ${
            isRightDisabled
              ? 'cursor-not-allowed bg-gray-50'
              : 'cursor-pointer bg-white hover:bg-gray-50 hover:border-gray-400'
          }
        `}
        onClick={onClickRight}
        disabled={isRightDisabled}
        style={{
          color: isRightDisabled ? '#D9D9D9' : '#333236',
        }}
      >
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path
            d='M6 12L10 8L6 4'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};
