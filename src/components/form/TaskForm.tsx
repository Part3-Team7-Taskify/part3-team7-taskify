'use client';
import { TaskFormValues, Member } from '@/components/form/formTypes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { apiClient } from '@/api/auth/apiClient';
// import { useAuth } from '@/contexts/AuthContext';

interface TaskFormProps {
  id: number; //카드 id
  dashboardId: number; //대시보드 id
  columnId: number; //이 카드가 속한 컬럼 id
  initialValues?: TaskFormValues; //수정시 초기값
  onSubmit: (values: TaskFormValues) => void; //생성,수정완료시 호출함수
  onCancel: () => void; //취소버튼 함수
  memberList: string[]; //담당자 목록
  member: Member[]; //담당자들
  token: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  id,
  columnId,
  dashboardId,
  onSubmit,
  onCancel,
  token,
  // memberList,
  initialValues,
}) => {
  // 상태 관리
  const [assigneeUserId, setAssigneeUserId] = useState<number>(initialValues?.assigneeUserId || 0);
  const [title, setTitle] = useState<string>(initialValues?.title || '');
  const [description, setDescription] = useState<string>(initialValues?.description || '');
  const [dueDate, setDueDate] = useState<Date | null>(
    initialValues?.dueDate ? new Date(initialValues.dueDate) : null,
  );
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [newTag, setNewTag] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(initialValues?.imageUrl || '');
  const [memberList, setMemberList] = useState<string[]>([]); // 담당자 목록 상태

  useEffect(() => {
    // 담당자 목록 가져오는 함수
    const fetchMemberList = async () => {
      try {
        const response = await apiClient.get(`/members?page=1&size=20&dashboardId=${dashboardId}`, {
          headers: {
            Authorization: `Bearer ${token}`, //토큰 추가요
          },
        });
        setMemberList(response.data.members);
      } catch (error) {
        console.error('Failed to fetch member list:', error);
      }
    };

    fetchMemberList();
  }, [dashboardId, token]);

  // 이벤트 핸들러
  const handleAssigneeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAssigneeUserId(parseInt(e.target.value, 10));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDueDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  const handleNewTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const taskData: TaskFormValues = {
      id: initialValues?.id, // 수정 시 ID 전달
      dashboardId: initialValues?.dashboardId ?? 0, // 대시보드 ID를 전달하거나 기본값 사용
      columnId: columnId,
      assigneeUserId: assigneeUserId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    };

    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='assigneeUserId'>담당자</label>
        <select id='assigneeUserId' value='assigneeUserId' onChange={handleAssigneeChange}>
          <option>선택</option>
          {memberList.map((member) => (
            <option key={member} value={member}>
              {}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor='title'>제목*</label>
        <input
          className='border'
          type='text'
          id='title'
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div>
        <label htmlFor='description'>설명*</label>
        <textarea
          className='border'
          id='description'
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div>
        <label htmlFor='dueDate'>마감일</label>
        <DatePicker
          className='border'
          selected={dueDate}
          onChange={handleDueDateChange}
          dateFormat='yyyy-MM-dd'
        />
      </div>

      <div>
        <label>태그</label>
        <div>
          <input
            className='border'
            type='text'
            value={newTag}
            onChange={handleNewTagChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button className='border' type='button' onClick={handleAddTag}>
            추가
          </button>
        </div>
        <div>
          {tags.map((tag) => (
            <span className='border' key={tag}>
              {tag}
              <button type='button' onClick={() => handleRemoveTag(tag)}>
                X
              </button>
            </span>
          ))}
        </div>

        <div>
          <label htmlFor='imageUrl'>이미지</label>
          <input className='border' type='file' id={imageUrl} onChange={handleImageUrlChange} />
          {imageUrl && <img src={imageUrl} alt='Upload' />}
        </div>

        <div>
          <button className='border' onClick={onCancel}>
            취소
          </button>
          <button className='border' type='submit'>
            {initialValues ? '수정' : '생성'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
