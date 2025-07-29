/***이서님이 수정해주실 페이지 !****/

import { useEffect, useRef, useState } from 'react';
import UserDropdown from '../dropdown/UserDropdown';
import { ModalRoot } from '../modal/ModalRoot';
import { getMembersApi, members, getUserMeApi, postCardApi, CardRequest } from '@/api/card/apis';
import { UserType } from '../chip/UserChip';
import { Input } from '../input/Input';
import DatePicker from 'react-datepicker';
import { useImageUpload, imageUrl } from '@/hooks/useImageUpload';
import ImageUpload from '../ImageUpload';
import { formatDueDate } from '@/utils/formatDueDate';

interface UserTypeAddUserId extends UserType {
  userId: number;
}

interface Props {
  modalOpenSetState: (state: boolean) => void;
  modalOpenState: boolean;
  onCreated?: () => void;
  dashboardId: number;
  columnId: number;
}

const CardCreateModal = ({
  modalOpenSetState,
  modalOpenState,
  onCreated,
  dashboardId,
  columnId,
}: Props) => {
  const [members, setMembers] = useState<members[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);

  const [tags, setTags] = useState<string[]>([]); // 사용자가 현재 입력 필드에 타이핑 중인 텍스트
  const [inputValue, setInputValue] = useState<string>('');
  // 입력 필드에 대한 참조 (포커스 관리를 위함)
  const inputRef = useRef<HTMLInputElement>(null);
  const { imageUrl, handleFileChange } = useImageUpload(columnId);

  const [assigneeId, setAssigneeId] = useState<number | null>(null);

  // 입력 필드 값이 변경될 때 호출되는 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 키보드 이벤트 (특히 Enter와 Backspace)를 처리하는 핸들러
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키를 눌렀을 때
    if (e.key === 'Enter') {
      // 입력 값이 비어있지 않고, 공백만 있는 경우가 아닐 때
      if (inputValue.trim() !== '') {
        // 현재 입력된 값을 태그 배열에 추가
        setTags([...tags, inputValue.trim()]);
        // 입력 필드 초기화
        setInputValue('');
      }
      // Enter 키의 기본 동작 (폼 제출 등) 방지
      e.preventDefault();
    }
    // Backspace 키를 눌렀을 때
    else if (e.key === 'Backspace') {
      // 입력 필드가 비어있고, 태그가 하나 이상 있을 때
      if (inputValue === '' && tags.length > 0) {
        // 마지막 태그를 제거
        setTags(tags.slice(0, tags.length - 1));
        // Backspace 키의 기본 동작 (이전 페이지 이동 등) 방지
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    const handleGetMembers = async () => {
      try {
        const res = await getMembersApi(dashboardId);
        const data = res.members;
        const res2 = await getUserMeApi();
        const data2 = {
          id: res2.id,
          nickname: res2.nickname,
          profileImageUrl: res2.profileImageUrl ?? undefined,
        };
        setUserData(data2);
        setMembers(data);
      } catch (err) {
        console.error('멤버 가져오기 실패:', err);
      }
    };
    handleGetMembers();
  }, []);
  const titleSetting = (e) => {
    setTitle(e.target.value);
  };
  const handleDueDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  const onSubmit = async () => {
    const formattedDueDate = formatDueDate(dueDate); // 예: '2025-07-30'

    // 검증 또는 필수 값 체크 (선택)
    if (!userData?.id || !dashboardId || !columnId || !title) {
      console.error('필수 정보가 누락되었습니다.');
      return;
    }

    const cardData: CardRequest = {
      assigneeUserId: assigneeId, // userMe 데이터에서 id를 가져왔다고 가정
      dashboardId: dashboardId,
      columnId: columnId,
      title: title,
      description: description,
      dueDate: formattedDueDate,
      tags: tags,
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/4-4_52697_1753460276638.jpeg', // 이미지 업로드 후 받은 서버 주소
    };

    try {
      await postCardApi(cardData);
      modalOpenSetState(false);
      onCreated?.();
      // 성공 후 UI 처리 로직: 예) 모달 닫기, 목록 갱신 등
    } catch (err) {
      console.error('카드 생성 실패:', err);
    }
  };
  return (
    <ModalRoot
      modalButtonType='two'
      modalOpenState={modalOpenState}
      modalOpenSetState={modalOpenSetState}
      title='할 일 생성'
      buttonCallback={onSubmit}
    >
      <div>
        <label className='block mb-2 text-sm font-medium text-gray-700'>담당자</label>
        <UserDropdown.Root
          valueCallback={(selectedUser) => {
            setAssigneeId(selectedUser?.userId ?? null); // null이면 null을 설정
          }}
        >
          <UserDropdown.Trigger>이름을 입력해 주세요</UserDropdown.Trigger>
          <UserDropdown.Content>
            {members.map((user) => {
              const converted: UserTypeAddUserId = {
                id: user.id,
                nickname: user.nickname,
                profileImageUrl: user.profileImageUrl,
                userId: user.userId,
              };
              return <UserDropdown.Item key={user.id}>{converted}</UserDropdown.Item>;
            })}
          </UserDropdown.Content>
        </UserDropdown.Root>
        <label className='block mb-2 text-sm font-medium text-gray-700'>
          제목<span className='text-pri'>*</span>
        </label>
        <Input
          type='text'
          placeholder='제목을 입력해주세요'
          onChange={(e) => titleSetting(e)}
        ></Input>

        <label className='block mb-2 text-sm font-medium text-gray-700'>
          설명<span className='text-pri'>*</span>
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder='설명을 입력해주세요'
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
        />

        <label className='block mb-1 font-semibold text-gray-700'>태그</label>
        <div className='flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-lg shadow-sm bg-white min-h-[44px] w-full max-w-md cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all duration-200'>
          {/* 현재 추가된 태그들을 렌더링 */}
          {tags.map((tag, index) => (
            <span
              key={index} // 실제 애플리케이션에서는 고유한 ID를 사용하는 것이 좋습니다.
              className='flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full whitespace-nowrap'
            >
              {tag}
            </span>
          ))}

          <div>
            {/* 사용자가 텍스트를 입력하는 실제 input 필드 */}
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
        </div>
        <ImageUpload previewUrl={imageUrl} handleFileChange={handleFileChange} />
      </div>
    </ModalRoot>
  );
};

export default CardCreateModal;
