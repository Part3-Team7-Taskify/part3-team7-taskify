import { commentResponse, deleteCommentApi, editCommentApi } from '@/api/comments/apis';
import { UserChip } from '../chip/UserChip';
import { formatDueDate } from '@/utils/formatDueDate';
import { useState } from 'react';

interface Props {
  comment: commentResponse;
  getCommentsHandler: () => void;
}

const Comments = ({ comment, getCommentsHandler }: Props) => {
  const dateTostring = new Date(comment.createdAt);
  const formatDate = formatDueDate(dateTostring);

  const [isEdited, setIsEdited] = useState(false);
  const [editContent, setEditContent] = useState(comment.content); // ✨ 수정할 내용 상태

  const deleteCommentHandler = async () => {
    try {
      await deleteCommentApi(comment.id);
      getCommentsHandler();
    } catch {
      console.error('댓글 삭제 실패');
    }
  };

  const editCommentHandler = () => {
    setIsEdited(true);
  };

  const saveCommentHandler = async () => {
    try {
      await editCommentApi(comment.id, { content: editContent }); // PUT 요청
      setIsEdited(false);
      getCommentsHandler(); // 최신 댓글 목록 다시 불러오기
    } catch {
      console.error('댓글 수정 실패');
    }
  };

  return (
    <div key={comment.id}>
      <div className='flex items-start gap-[8px]'>
        <UserChip user={comment.author} size='small' hideName={true} />
        <div className='flex flex-col gap-[8px]'>
          <div className='flex items-center gap-[8px]'>
            <span className='text-black-200 text-[14px] font-semibold'>
              {comment.author.nickname}
            </span>
            <span className='text-gray-200 text-[12px]'>{formatDate}</span>
          </div>

          {isEdited ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className='h-[50px] w-full border w-full border-gray-300 rounded-md p-[8px] resize-none'
            />
          ) : (
            <div className='text-sm text-black-300'>{comment.content}</div>
          )}

          <div className='flex gap-[5px]'>
            {isEdited ? (
              <button onClick={saveCommentHandler} className='text-blue-500 text-[11px] border-0'>
                저장
              </button>
            ) : (
              <button onClick={editCommentHandler} className='text-gray-200 text-[11px] border-0'>
                수정
              </button>
            )}
            <button onClick={deleteCommentHandler} className='text-gray-200 text-[11px] border-0'>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
