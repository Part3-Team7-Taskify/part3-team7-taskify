'use client';
import { useImageUpload } from '@/hooks/useImageUpload';
import ImageUpload from '@/components/taskform/ImageUpload';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TaskFormValues } from '@/components/taskform/formTypes';
import { formatDueDate } from '@/utils/formatDueDate';
import InputField from '@/components/taskform/InputField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { apiClient } from '@/api/auth/apiClient';
import UserDropdown from '@/components/dropdown/UserDropdown';
import { Members } from '@/components/taskform/formTypes';
import { UserType } from '@/types/UserTypes';
import { CardRequest } from '@/api/cards/apis';
import { getMembersApi, getUserMeAPI } from '@/api/cards/apis';
import { backgroundColors, colorMap } from '@/components/taskform/tagColors';
import { Button } from '@/components/button/Button';

interface TaskFormProps {
  columnId: number;
  dashboardId: number;
  modalOpenSetState: (state: boolean) => void;
  initialValues?: TaskFormValues | undefined;
  onCreated?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  dashboardId,
  columnId,
  onCreated,
  modalOpenSetState,
  initialValues,
}: TaskFormProps): React.ReactNode => {
  const [members, setMembers] = useState<Members[]>([]);
  const [title, setTitle] = useState<string>(initialValues?.title || '');
  const [description, setDescription] = useState<string>(initialValues?.description || '');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { imageUrl, handleFileChange } = useImageUpload(columnId);
  const [selectedItem, setSelectedItem] = useState<number | null>();
  const [actionButtonText, setActionButtonText] = useState<string>('생성');
  const isFormValid =
    title.trim() !== '' && description.trim() !== '' && userData?.id !== undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedDueDate = formatDueDate(dueDate);
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.error('토큰이 없습니다.');
      return;
    }
    if (!userData?.id || !dashboardId || !columnId || !title) {
      console.error('필수 정보를 입력 해 주세요.');
      return;
    }
    const cardData: CardRequest = {
      assigneeUserId: selectedItem,
      dashboardId: dashboardId,
      columnId: columnId,
      title: title,
      description: description,
      dueDate: formattedDueDate,
      tags: tags,
      imageUrl: imageUrl,
    };
    try {
      await apiClient.post('/cards', cardData);
      console.log('POST 요청 데이터:', { ...cardData });
      if (onCreated) onCreated();
    } catch (error) {
      console.error('할 일 생성 실패:', error);
      alert('할 일 생성 실패');
    }
  };

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || '');
      setDescription(initialValues.description || '');
      setDueDate(initialValues.dueDate ? new Date(initialValues.dueDate) : null);
      setTags(initialValues.tags || []);
      setActionButtonText('수정');
    } else {
      setTitle('');
      setDescription('');
      setDueDate(null);
      setTags([]);
      setActionButtonText('생성');
    }
  }, [initialValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); //엔터키 등 기본 제출 방지 추가
      e.stopPropagation(); //이벤트버블 방지
      if (inputValue.trim() !== '') {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
      e.preventDefault(); //엔터키 등 기본 제출 방지 추가
    } else if (e.key === 'Backspace') {
      if (inputValue === '' && tags.length > 0) {
        setTags(tags.slice(0, tags.length - 1));
        e.preventDefault(); // 백스페이스 뒤로가기 등 방지 추가
      }
    }
  };

  useEffect(() => {
    //멤버 정보 받아오기
    const handleGetMembers = async () => {
      try {
        const [membersRes, userMeRes] = await Promise.all([
          getMembersApi(dashboardId),
          getUserMeAPI(),
        ]);

        const membersData: Members[] = membersRes.members.map((member) => ({
          id: member.id,
          nickname: member.nickname,
          profileImageUrl: member.profileImageUrl,
          userId: member.userId,
          email: member.email,
          createdAt: member.createdAt,
          updatedAt: member.updatedAt,
          isOwner: member.isOwner,
        }));
        const userMeData: UserType = {
          id: userMeRes.id,
          nickname: userMeRes.nickname,
          profileImageUrl: userMeRes.profileImageUrl,
          email: userMeRes.email,
          createdAt: userMeRes.createdAt,
          updatedAt: userMeRes.updatedAt,
        };

        setMembers(membersData);
        setUserData(userMeData);
      } catch (err) {
        console.error('멤버 가져오기 실패:', err);
      }
    };
    handleGetMembers();
  }, []);

  const titleSetting = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDueDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  const getColorForTag = (tag: string): string => {
    if (colorMap[tag]) {
      return colorMap[tag]; // 이미 할당된 색상 반환
    }
    // 새 태그의 경우, 색상 맵에 할당
    const assignedColor = backgroundColors[Object.keys(colorMap).length % backgroundColors.length];
    colorMap[tag] = assignedColor;
    return assignedColor;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mx-auto px-4 max-w-[520px] min-w-[295px]'>
        <h1 className='text-[24px]'>할일 생성</h1>
        <div className='w-full h-auto '>
          <label htmlFor='assigneeUserId' className='block mb-1 font-semibold text-gray-700'>
            담당자
          </label>
          <UserDropdown.Root
            valueCallback={(item) => {
              setSelectedItem(item?.userId ?? null);
              console.log(members);
            }}
          >
            <UserDropdown.Trigger>이름을 입력해 주세요</UserDropdown.Trigger>
            <UserDropdown.Content>
              {members.map((user) => {
                const converted: UserType = {
                  id: user.id,
                  email: user.email,
                  createdAt: user.createdAt,
                  updatedAt: user.updatedAt,
                  nickname: user.nickname,
                  profileImageUrl: user.profileImageUrl,
                  userId: user.userId, // LJE 여기도 수정했음
                };
                return <UserDropdown.Item key={user.id}>{converted}</UserDropdown.Item>;
              })}
            </UserDropdown.Content>
          </UserDropdown.Root>

          <label htmlFor='title' className='block mb-1 font-semibold text-gray-700'>
            제목<span className='text-pri'>*</span>
          </label>
          <InputField
            label=''
            type='text'
            placeholder='제목을 입력해 주세요'
            onChange={(e) => titleSetting(e)}
          ></InputField>

          <label htmlFor='description' className='block mb-1 font-semibold text-gray-700'>
            설명<span className='text-pri'>*</span>
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder='설명을 입력해 주세요'
            className='border border-gray-400 rounded p-2 w-full h-24 resize-none'
          ></textarea>

          <label htmlFor='dueDate' className='block mb-1 font-semibold text-gray-700'>
            마감일
          </label>
          <DatePicker
            id='dueDate'
            shouldCloseOnSelect
            onChange={handleDueDateChange}
            selected={dueDate}
            showTimeSelect // 시간 선택 기능 활성화
            timeFormat='HH:mm' // 시간 포맷 (기본값이 HH:mm)
            timeIntervals={30} // 15분 간격으로 선택 가능
            dateFormat='yyyy-MM-dd HH:mm' // 보여주는 포맷
            className='border border-gray-400 rounded p-2 w-full'
          />

          <label className='block mb-1 font-semibold text-gray-700'>태그</label>
          <div className='flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-lg shadow-sm bg-white min-h-[44px] w-full max-w-md cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all duration-200'>
            {tags.map((tag, index) => {
              const colorClass = getColorForTag(tag);
              return (
                <span
                  key={index}
                  className={`flex items-center ${colorClass} text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full whitespace-nowrap`}
                >
                  {tag}
                </span>
              );
            })}
            <div>
              <input
                ref={inputRef} // inputRef 연결
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                onKeyUp={handleInputKeyDown}
                placeholder={tags.length === 0 ? '태그를 입력하고 Enter를 누르세요' : ''} // 태그가 없을 때만 플레이스홀더 표시
                className='flex-grow min-w-[80px] p-0 border-none outline-none bg-transparent text-gray-800 text-base'
              />
            </div>
          </div>

          <div className='mb-4'>
            <label className='block mb-1 font-semibold text-gray-700'>이미지 업로드</label>
            <ImageUpload previewUrl={imageUrl} handleFileChange={handleFileChange} />
          </div>

          <div>
            <Button
              size='small'
              type='outline'
              onClick={() => modalOpenSetState(false)}
              className='mr-2'
            >
              취소
            </Button>
            <Button
              size='small'
              type='primary'
              onClick={() => handleSubmit}
              disabled={!isFormValid}
              className='mr-2'
            >
              {actionButtonText}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
export type { TaskFormProps };
