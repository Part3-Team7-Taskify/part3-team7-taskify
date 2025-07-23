'use client';
import { TaskFormValues, Member } from '@/components/form/formTypes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { apiClient } from '@/api/auth/apiClient';
// import { useAuth } from '@/contexts/AuthContext';
import { formatDueDate } from '@/utils/formatDueDate';

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
  page?: number;
  size?: number;
}

const TaskForm: React.FC<TaskFormProps> = ({
  id,
  columnId = 52456,
  dashboardId = 15559, //상위 컴포넌트에서 받는 프롭스
  onSubmit,
  onCancel,
  token,
  page = 1,
  size = 20,
  // memberList,
  initialValues,
}) => {
  // 상태 관리
  const [assigneeUserId, setAssigneeUserId] = useState<number>(initialValues?.assigneeUserId || 0);
  const [title, setTitle] = useState<string>(initialValues?.title || '');
  const [description, setDescription] = useState<string>(initialValues?.description || '');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [newTag, setNewTag] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(initialValues?.imageUrl || '');
  const [memberList, setMemberList] = useState<string[]>([]); // 담당자 목록 상태

  useEffect(() => {
    const fetchMembers = async () => {
      const token = sessionStorage.getItem('accessToken');

      try {
        const dashboardIdNumber = Number(dashboardId);
        if (isNaN(dashboardIdNumber)) {
          throw new Error('Invalid dashboardId');
        }

        const res = await apiClient.get('/members', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            page,
            size,
            dashboardId: dashboardIdNumber, //대시보드아이디숫자로리퀘스트되도록
          },
        });
        setMemberList(res.data.members);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, [token, dashboardId, page, size]);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // 선택된 첫 번째 파일
      setImageUrl(URL.createObjectURL(file)); // 이미지 URL을 상태에 저장
    } else {
      setImageUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formattedDueDate = formatDueDate(dueDate);
    console.log('포맷된 dueDate:', formattedDueDate);
    e.preventDefault();

    const taskData: TaskFormValues = {
      id: initialValues?.id, // 수정 시 ID 전달
      dashboardId: initialValues?.dashboardId ?? 0, // 대시보드 ID를 전달하거나 기본값 사용
      columnId,
      assigneeUserId: assigneeUserId,
      title,
      description,
      dueDate: formattedDueDate,
      tags,
      ...(imageUrl && { imageUrl: imageUrl }), //컨디셔널 오브젝트 리터럴?
    };

    await apiClient.post('/cards', taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='assigneeUserId'>담당자</label>
        <select id='assigneeUserId' value={assigneeUserId} onChange={handleAssigneeChange}>
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
          onChange={(e) => {
            setDueDate(e);
          }}
          selected={dueDate}
          showTimeSelect // 시간 선택 기능 활성화
          timeFormat='HH:mm' // 시간 포맷 (기본값이 HH:mm)
          timeIntervals={30} // 15분 간격으로 선택 가능
          dateFormat='yyyy-MM-dd HH:mm' // 보여주는 포맷
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
          <label htmlFor='imageFile'>이미지</label>
          <input className='border' type='file' onChange={handleFileChange} />
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
