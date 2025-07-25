'use client';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useTags } from '@/hooks/useTags';
import { useEffect, useState, ChangeEvent } from 'react';
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
}

const TaskForm: React.FC<TaskFormProps> = ({
  id,
  columnId,
  dashboardId,
  initialValues,
  onSubmit,
  onCancel,
  member,
  page = 1,
  size = 20,
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
          data: { page, size, dashboardId: dashboardIdNumber },
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
    const taskData: TaskFormValues = {
      id,
      dashboardId: initialValues?.dashboardId ?? 0, // 대시보드 ID를 전달하거나 기본값 사용
      columnId,
      assigneeUserId: assigneeUserId,
      title,
      description,
      dueDate: formattedDueDate,
      tags,
      ...(imageUrl && { imageUrl: imageUrl }), //컨디셔널 오브젝트 리터럴?
    };
    onSubmit(taskData);
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
            {memberList.map((memberId) => (
              <option key={memberId} value={parseInt(memberId, 10)}>
                {member.find((m) => m.id === parseInt(memberId, 10))?.name || memberId}
              </option>
            ))}
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
            <ImageUpload imageUrl={imageUrl} handleFileChange={handleFileChange} />
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
