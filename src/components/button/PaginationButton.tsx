export const PaginationButton = ({
  onClickLeft,
  onClickRight,
}: {
  onClickLeft?: () => void;
  onClickRight?: () => void;
}) => {
  return (
    <>
      <button
        className='bg-white w-9 h-9 text-black rounded-l-sm border border-gray-300'
        onClick={onClickLeft}
      >
        &lt;
      </button>
      <button
        className='bg-white w-9 h-9 text-black rounded-r-sm border border-gray-300'
        onClick={onClickRight}
      >
        &gt;
      </button>
    </>
  );
};
