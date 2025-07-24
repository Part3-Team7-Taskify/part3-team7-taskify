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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    await onSubmit(taskData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='assigneeUserId'>담당자</label>
        <select id='assigneeUserId' value={assigneeUserId} onChange={handleAssigneeChange}>
          <option>선택</option>
          {memberList.map((memberId) => (
            <option key={memberId} value={parseInt(memberId, 10)}>
              {member.find((m) => m.id === parseInt(memberId, 10))?.name || memberId}
            </option>
          ))}
        </select>

        <div>
          <InputField label='제목*' id='title' value={title} onChange={handleTitleChange} />
        </div>

        <div>
          <label htmlFor='description'>설명*</label>
          <textarea
            id='description'
            value={description}
            onChange={handleDescriptionChange}
            className='border p-2 w-full h-24'
          />
        </div>

        <div>
          <label htmlFor='dueDate'>마감일</label>
          <DatePicker
            className='border p-2 w-full'
            onChange={handleDueDateChange}
            selected={dueDate}
            showTimeSelect // 시간 선택 기능 활성화
            timeFormat='HH:mm' // 시간 포맷 (기본값이 HH:mm)
            timeIntervals={30} // 15분 간격으로 선택 가능
            dateFormat='yyyy-MM-dd HH:mm' // 보여주는 포맷
          />
        </div>

        <div>
          <TagInput
            tags={tags}
            newTag={newTag}
            handleNewTagChange={handleNewTagChange}
            handleAddTag={addTag}
            handleRemoveTag={removeTag}
          />
        </div>

        <div className='mb-4'>
          <ImageUpload imageUrl={imageUrl} handleFileChange={handleFileChange} />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
