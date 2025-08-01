import { commentRequest, postCommentApi, commentResponse } from '@/api/comments/apis';
import { useState } from 'react';
import Comments from './Comments';

interface Props {
  cardId: number;
  columnId: number;
  dashboardId: number;
  comments: commentResponse[] | null;
  getCommentsHandler: () => void;
}

const CommentsWrapper = ({
  columnId,
  cardId,
  dashboardId,
  getCommentsHandler,
  comments,
}: Props) => {
  const [commentVal, setCommentVal] = useState<string>('');

  const inputChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentVal(value);
  };

  const postButton = async () => {
    if (cardId == null) return;
    commentPostHandler();
    setCommentVal('');
  };
  const commentPostHandler = async () => {
    const commentData: commentRequest = {
      content: commentVal,
      cardId,
      columnId,
      dashboardId,
    };

    try {
      await postCommentApi(commentData);
      getCommentsHandler(); // 댓글 다시 가져오기
    } catch (err) {
      console.error('댓글 작성 실패:', err);
    }
  };

  return (
    <div>
      <div className='relative mb-[10px]'>
        <textarea
          className='h-[70px] border w-full border-gray-300 rounded-md p-[8px] resize-none'
          placeholder='댓글 작성하기'
          onChange={inputChangeValue}
          value={commentVal}
        />
        <button
          onClick={postButton}
          className='absolute bottom-[12px] text-pri right-[20px] w-[84px] h-[28px] border rounded-sm border-gray-300 cursor-pointer'
        >
          입력
        </button>
      </div>

      {comments && comments.length > 0 && (
        <div className='flex flex-col gap-[8px] h-[100px] sm:h-[130px] overflow-y-scroll'>
          {comments.map((comment) => (
            <Comments comment={comment} key={comment.id} getCommentsHandler={getCommentsHandler} />
          ))}
        </div>
      )}
    </div>
  );
};
export default CommentsWrapper;
