const Comment = () => {
  return (
    <div>
      <div className='relative'>
        <textarea
          className='h-[70px] border w-full border-gray-300 rounded-md p-[8px] resize-none'
          placeholder='댓글 작성하기'
        />
        <button className='absolute bottom-[12px] right-[20px] w-[84px] h-[28px] border rounded-sm border-gray-300 cursor-pointer'>
          입력
        </button>
      </div>
    </div>
  );
};
export default Comment;
