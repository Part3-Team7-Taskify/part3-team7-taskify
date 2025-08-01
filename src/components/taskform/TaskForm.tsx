'use client';
import { useImageUpload } from '@/hooks/useImageUpload';
import ImageUpload from '@/components/taskform/ImageUpload';
import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { formatDueDate } from '@/utils/formatDueDate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { apiClient } from '@/api/auth/apiClient';
import UserDropdown from '@/components/dropdown/UserDropdown';
import { Members } from '@/components/taskform/formTypes';
import { UserType } from '@/types/UserTypes';
import { CardRequest } from '@/api/cards/apis';
import { getMembersApi, getUserMeAPI } from '@/api/cards/apis';
import { Button } from '@/components/button/Button';
import { updateCardApi, UpdateCardRequestDto } from '@/api/card/updateCardApi';
import { Column } from '@/api/card/getColumns';

import ColumnDropdown from '../dropdown/ColumnDropdown';
import { getColumnsByDashboardId } from '@/api/snb/apis';

interface TaskFormProps {
  columnId: number;
  dashboardId: number;
  cardId?: number | null;
  modalOpenSetState: (state: boolean) => void;
  initialValues?: {
    title: string;
    description: string;
    dueDate: string;
    tags: string[];
    imageUrl?: string | null;
    assigneeUserId?: number | null;
    columnId?: number | null;
    cardId?: number | null;
  };
  onCreated?: () => void;
  onEditUpdate?: () => void;
}
/*태그 - 배경색, 폰트색상 맵핑*/
export const colorMap: Record<string, { bg: string; text: string }> = {
  pink: { bg: 'bg-pink-100', text: 'text-pink-500' },
  green: { bg: 'bg-green-100', text: 'text-green-500' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-500' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-500' },
  red: { bg: 'bg-red-100', text: 'text-red-500' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-500' },
  lime: { bg: 'bg-lime-100', text: 'text-lime-500' }, //기본값
};

const TaskForm: React.FC<TaskFormProps> = ({
  dashboardId,
  columnId,
  onCreated,
  modalOpenSetState,
  initialValues,
  cardId,
  onEditUpdate,
}: TaskFormProps): React.ReactNode => {
  const [members, setMembers] = useState<Members[]>([]);
  const [title, setTitle] = useState<string>(initialValues?.title || '');
  const [description, setDescription] = useState<string>(initialValues?.description || '');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);

  const [tags, setTags] = useState<string[]>([]);
  // const [colorMap, setColorMap] = useState<{ [tag: string]: string }>({});

  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { imageUrl, handleFileChange } = useImageUpload(columnId);
  const [selectedItem, setSelectedItem] = useState<number | null>();
  const [actionButtonText, setActionButtonText] = useState<string>('생성');
  const isFormValid =
    title.trim() !== '' && description.trim() !== '' && userData?.id !== undefined;
  // 카드 상세 보기 열때, 카드 ID도 저장
  const [columns, setColumns] = useState<Column[]>([]);
  // 선택된 컬럼 ID 저장 (초기에는 빈값 또는 null)
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (actionButtonText === '수정') {
      await handleUpdate();
    } else {
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
        ...(tags ? { tags } : {}), // POST 필수값 제외 옵셔널 파라미터 지정
        ...(dueDate ? { dueDate: formattedDueDate } : {}), // POST 필수값 제외 옵셔널 파라미터 지정
        ...(imageUrl ? { imageUrl } : {}), // POST 필수값 제외 옵셔널 파라미터 지정
      };
      try {
        await apiClient.post('/cards', cardData);
        onCreated?.(); // 포스트완료하면 리랜더링 일어나서 컬럼업데이트됨.
        modalOpenSetState(false); // 모달 닫아줌
      } catch (error) {
        console.error('할 일 생성 실패:', error);
        alert('할 일 생성 실패');
      }
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

  useEffect(() => {
    const fetchColumns = async () => {
      const cols = await getColumnsByDashboardId(dashboardId);
      setColumns(cols);

      // initialvalues 있다면 여기서 선택 컬럼 세팅
      // 예: props.initialColumnId이 있으면
      if (initialValues?.columnId) {
        setSelectedColumnId(initialValues.columnId);
      }
    };
    fetchColumns();
  }, [initialValues]);

  const handleUpdate = async () => {
    // 수정 버튼 제출시 호출 함수!
    // 데이터 준비
    const payload: UpdateCardRequestDto = {
      columnId: selectedColumnId,
      assigneeUserId: selectedItem,
      title,
      description,
      dueDate: formatDueDate(dueDate),
      tags,
      imageUrl, // 업로드된 URL
      cardId,
    };

    try {
      await updateCardApi(cardId ?? null, payload);
      onEditUpdate?.(); //대시보드 업데이트 !!!!!!!!애가 문제임 리랜더링이 안이루어짐
      modalOpenSetState(false); // 완료되면 모달 닫기
    } catch (err) {
      console.error('카드 수정 실패:', err);
      alert('수정 실패');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 태그에 배경색, 폰트색 설정해서 api로 보냄
    const colors = Object.keys(colorMap); // ['pink', 'green', ...]
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const fullTag = `${randomColor}/${inputValue}`;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        setTags([...tags, fullTag]); // API로 전송될 데이터
        setInputValue('');
      }
    } else if (e.key === 'Backspace') {
      if (inputValue === '' && tags.length > 0) {
        setTags(tags.slice(0, tags.length - 1));
        e.preventDefault();
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
  // 리액트 데이트 피커에서 자동완성 기능 끄기 :: 커스텀으로 만들었어야했음.
  const CustomDateInput = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(
    ({ value, onClick, onChange }, ref) => (
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        onChange={onChange}
        autoComplete='off' // 자동완성 끔
        className='border border-gray-300 rounded-lg p-2 w-full'
      />
    ),
  );
  CustomDateInput.displayName = 'CustomDateInput';
  return (
    <div>
      <div className='mx-auto max-w-[520px] min-w-[295px]'>
        {/* <h1 className='text-[24px]'>할일 수정</h1> */}
        <div className='w-full h-auto '>
          {/* 담당자 영역 절반 나누기 */}
          <div className='flex mb-4'>
            {/* 케이스2: initialValues 있다면 */}
            {initialValues ? (
              <>
                {/* 왼쪽: 수정할 때 선택 상태선택 */}
                <div className='w-1/2 p-2 border-r'>
                  <label className='block mb-1 font-medium text-gray-700'>선택 컬럼 제목</label>
                  <div className='text-gray-800'>
                    <ColumnDropdown.Root
                      valueCallback={(item) => setSelectedColumnId(item?.id ?? null)}
                    >
                      {/* valueCallback={(item) => setSelectedColumnId(item?.id ?? '')} */}
                      <ColumnDropdown.Trigger>컬럼 선택</ColumnDropdown.Trigger>
                      <ColumnDropdown.Content>
                        {columns.map((column) => (
                          <ColumnDropdown.Item key={column.id} item={column} />
                        ))}
                      </ColumnDropdown.Content>
                    </ColumnDropdown.Root>
                  </div>
                </div>

                {/* 오른쪽: (initialValues 있을 때)기존 담당자 보여주기 */}
                <div className='w-1/2 p-2'>
                  <label className='block mb-1 font-medium'>담당자 선택</label>
                  <UserDropdown.Root
                    valueCallback={(item) => {
                      setSelectedItem(item?.userId ?? null);
                    }}
                  >
                    <UserDropdown.Trigger>담당자 선택</UserDropdown.Trigger>
                    <UserDropdown.Content>
                      {members.map((user) => {
                        const converted: UserType = {
                          id: user.id,
                          email: user.email,
                          createdAt: user.createdAt,
                          updatedAt: user.updatedAt,
                          nickname: user.nickname,
                          profileImageUrl: user.profileImageUrl,
                          userId: user.userId,
                        };
                        return <UserDropdown.Item key={user.id}>{converted}</UserDropdown.Item>;
                      })}
                    </UserDropdown.Content>
                  </UserDropdown.Root>
                </div>
              </>
            ) : (
              /* 케이스1: 기존 UI 그대로 담당자만 보여주기 */
              <div className='w-full pt-[12px]'>
                <label htmlFor='assigneeUserId' className='block mb-1 font-medium text-gray-700'>
                  담당자
                </label>
                <UserDropdown.Root
                  valueCallback={(item) => {
                    setSelectedItem(item?.userId ?? null);
                    console.log(item);
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
              </div>
            )}
          </div>

          <label htmlFor='title' className='block mb-1 font-medium text-gray-700'>
            제목<span className='text-pri'>*</span>
          </label>
          <input
            className='w-full border border-gray-300 rounded-lg p-2'
            type='text'
            placeholder='제목을 입력해 주세요'
            onChange={(e) => titleSetting(e)}
            value={title}
          ></input>

          <label htmlFor='description' className='block mb-1 font-medium text-gray-700'>
            설명<span className='text-pri'>*</span>
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder='설명을 입력해 주세요'
            className='border border-gray-300 rounded-lg p-2 w-full h-24 resize-none'
          ></textarea>

          <label htmlFor='dueDate' className='block mb-1 font-medium text-gray-700'>
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
            className='border border-gray-300 rounded p-2 w-full'
            customInput={<CustomDateInput />}
          />

          <label className='block mb-1 font-medium text-gray-700'>태그</label>
          <div className='flex flex-nowrap overflow-hidden w-[295px] items-center gap-2 p-3 border border-gray-300 rounded-lg bg-white min-h-[44px] max-w-md cursor-text transition-all duration-200'>
            {tags &&
              tags.map((tag, index) => {
                const [color, text] = tag.split('/');
                const classes = colorMap[color] ?? colorMap.lime;

                return (
                  <span
                    key={index}
                    className={`flex-shrink-0 rounded-sm px-[6px] py-[2px] ${classes.bg} ${classes.text} text-[12px] font-medium`}
                  >
                    {text}
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
                className='flex-grow min-w-[250px] p-0 border-none outline-none bg-transparent text-gray-800 text-base'
              />
            </div>
          </div>

          <div className='mb-4'>
            <label className='block mb-1 font-medium text-gray-700'>이미지 업로드</label>
            <ImageUpload previewUrl={imageUrl} handleFileChange={handleFileChange} />
          </div>

          <div className='flex w-full gap-[7px]'>
            <Button
              size='small'
              variant='outline'
              onClick={() => modalOpenSetState(false)}
              className='w-1/2 h-[54px] font-semibold'
            >
              취소
            </Button>
            <Button
              size='small'
              variant='primary'
              onClick={() => {
                if (actionButtonText === '수정') {
                  handleUpdate(); // 수정 함수 호출
                } else {
                  handleSubmit(); // 생성 함수 호출
                }
              }}
              disabled={!isFormValid}
              className='w-1/2 h-[54px] font-semibold'
            >
              {actionButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
export type { TaskFormProps };
