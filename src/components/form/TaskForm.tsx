'use client';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useTags } from '@/hooks/useTags';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { TaskFormValues, Member } from '@/components/form/formTypes';
import { formatDueDate } from '@/utils/formatDueDate';
import InputField from '@/components/inputField';
import DatePicker from 'react-datepicker';
import TagInput from '@/components/TagInput';
import 'react-datepicker/dist/react-datepicker.css';
import { apiClient } from '@/api/auth/apiClient';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/button/Button';

interface TaskFormProps {
  id: number;
  columnId: number;
  dashboardId: number;
  initialValues?: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
  memberList: string[];
  member: Member[];
  token: string;
  page?: number;
  size?: number;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
}
interface CardType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateCardRequest {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  id = 5941,
  columnId = 52453,
  dashboardId = 15559,
  initialValues,
  onSubmit,
  onCancel,
  member,
  page = 1,
  size = 20,
  cards,
  setCards,
  onClose,
}) => {
  const [assigneeUserId, setAssigneeUserId] = useState<number>(initialValues?.assigneeUserId || 0);
  const [title, setTitle] = useState<string>(initialValues?.title || '');
  const [description, setDescription] = useState<string>(initialValues?.description || '');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [memberList, setMemberList] = useState<string[]>([]);
  const { tags, newTag, addTag, removeTag, handleNewTagChange } = useTags(
    initialValues?.tags ?? [],
  );
  const { imageUrl, handleFileChange } = useImageUpload(columnId);
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (initialValues?.assigneeUserId) {
      setAssigneeUserId(initialValues.assigneeUserId);
    }
  }, [initialValues]);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const dashboardIdNumber = Number(dashboardId);
        if (isNaN(dashboardIdNumber)) throw new Error('Invalid dashboardId');

        const res = await apiClient.get('/members', {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, size, dashboardId: dashboardIdNumber },
        });
        setMemberList(res.data.members);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, [dashboardId, page, size]);

  useEffect(() => {
    setIsFormValid(title.trim() !== '' && description.trim() !== '' && dueDate !== null);
  }, [title, description, dueDate]);

  // 아래로 이벤트 핸들러
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAssigneeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAssigneeUserId(parseInt(e.target.value, 10));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDueDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  const handleSubmit = async () => {
    const formattedDueDate = formatDueDate(dueDate);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('토큰이 없습니다.');
      return;
    }

    const requestData: CreateCardRequest = {
      assigneeUserId: assigneeUserId,
      dashboardId: dashboardId,
      columnId: columnId,
      title: title,
      description: description,
      dueDate: formattedDueDate,
      tags: tags,
      ...(imageUrl && { imageUrl: imageUrl }),
    };

    try {
      const res = await apiClient.post('/cards', requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //새로운 카드 추가 상태
      setCards([...cards, res.data]);

      //모달 닫기
      // onclose();

      //생성 성공후 콜백 호출(선택):부모컴포넌트에서 onSubmit={handleTaskSubmit}
      onSubmit({
        id,
        dashboardId: dashboardId,
        columnId: columnId,
        assigneeUserId: assigneeUserId,
        title: title,
        description: description,
        dueDate: formattedDueDate,
        tags: tags,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className='mx-auto px-4 max-w-[520px] min-w-[295px]'>
      <h1 className='text-[24px]'>할일 생성</h1>
      <div className='w-full h-auto '>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className='flex flex-col space-y-4'
        >
          <label htmlFor='assigneeUserId' className='block mb-1 font-semibold text-gray-700'>
            담당자
          </label>
          <select
            id='assigneeUserId'
            value={assigneeUserId}
            onChange={handleAssigneeChange}
            className='block w-full border border-gray-400 rounded p-2'
          >
            <option>선택</option>
            {member ? (
              memberList.map((memberId) => (
                <option key={memberId} value={parseInt(memberId, 10)}>
                  {member.find((m) => m.id === parseInt(memberId, 10))?.name || memberId}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>

          <div>
            <label htmlFor='title' className='block mb-1 font-semibold text-gray-700'>
              제목*
            </label>
            <InputField label='' id='title' value={title} onChange={handleTitleChange} />
          </div>

          <div>
            <label htmlFor='description' className='block mb-1 font-semibold text-gray-700'>
              설명*
            </label>
            <textarea
              id='description'
              value={description}
              onChange={handleDescriptionChange}
              className='border border-gray-400 rounded p-2 w-full h-24 resize-none'
            />
          </div>

          <div>
            <label htmlFor='dueDate' className='block mb-1 font-semibold text-gray-700'>
              마감일
            </label>
            <DatePicker
              id='dueDate'
              className='border border-gray-400 rounded p-2 w-full'
              onChange={handleDueDateChange}
              selected={dueDate}
              showTimeSelect // 시간 선택 기능 활성화
              timeFormat='HH:mm' // 시간 포맷 (기본값이 HH:mm)
              timeIntervals={30} // 15분 간격으로 선택 가능
              dateFormat='yyyy-MM-dd HH:mm' // 보여주는 포맷
            />
          </div>

          <div>
            <label className='block mb-1 font-semibold text-gray-700'>태그</label>
            <TagInput
              tags={tags}
              newTag={newTag}
              handleNewTagChange={handleNewTagChange}
              addTag={addTag}
              handleRemoveTag={removeTag}
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-1 font-semibold text-gray-700'>이미지 업로드</label>
            <ImageUpload previewUrl={imageUrl} handleFileChange={handleFileChange} />
          </div>

          <div className='flex justify-end gap-2'>
            <Button
              size='small'
              type='primary'
              onClick={onCancel} // 여기에 모달 닫힘 넣어야함
              className='bg-white text-zinc-500 w-full border border-gray-600'
            >
              취소
            </Button>
            <Button
              size='small'
              type={!isFormValid ? 'disabled' : 'primary'}
              onClick={handleSubmit}
              disabled={!isFormValid}
              className='w-full'
            >
              생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
