export const PaginationButton = ({
  onClickLeft,
  onClickRight,
  disabledLeft,
  disabledRight,
}: {
  onClickLeft: () => void;
  onClickRight: () => void;
  disabledLeft: boolean;
  disabledRight: boolean;
}) => {
  return (
    <>
      <button
        className='bg-white w-9 h-9 text-black rounded-l-sm border border-gray-300 disabled:opacity-50'
        disabled={disabledLeft}
        onClick={onClickLeft}
      >
        &lt;
      </button>
      <button
        className='bg-white w-9 h-9 text-black rounded-r-sm border border-gray-300 disabled:opacity-50'
        disabled={disabledRight}
        onClick={onClickRight}
      >
        &gt;
      </button>
    </>
  );
};
