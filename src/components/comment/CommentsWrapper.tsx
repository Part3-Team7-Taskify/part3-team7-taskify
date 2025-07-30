import { getCommentsApi, commentResponse } from '@/api/comments/apis';
import { useEffect, useState } from 'react';

interface Props {
  commentPostHandler: () => void;
  commentVal: string;
  setCommentVal: (val: string) => void;
  cardId: number | null;
}

const Comment = ({ cardId, commentPostHandler, commentVal, setCommentVal }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [testcomments, setTestComments] = useState<commentResponse[] | null>([]);

  const inputChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentVal(value);
  };
  const getCommentsHandler = async () => {
    if (cardId == null) return; // null 또는 undefined 방어
    try {
      const res = await getCommentsApi(cardId);
      setTestComments(res.comments);
    } catch (err) {
      console.error('댓글 가져오기 실패:', err);
    }
  };
  useEffect(() => {
    getCommentsHandler();
  }, []);

  const postButton = async () => {
    await commentPostHandler(); // 댓글 작성 완료될 때까지 기다림
    setCommentVal('');
    await getCommentsHandler(); // 그 후에 댓글 목록 다시 가져옴
  };

  return (
    <div>
      <div className='relative'>
        <textarea
          className='h-[70px] border w-full border-gray-300 rounded-md p-[8px] resize-none'
          placeholder='댓글 작성하기'
          onChange={inputChangeValue}
          value={commentVal}
        />
        <button
          onClick={postButton}
          className='absolute bottom-[12px] right-[20px] w-[84px] h-[28px] border rounded-sm border-gray-300 cursor-pointer'
        >
          입력
        </button>
      </div>
      <div>
        {testcomments?.map((el) => (
          <p key={el.id}>댓글 :: {el.content}</p>
        ))}
      </div>
    </div>
  );
};
export default Comment;
