'use client';

import { useState, useRef } from 'react';
import { apiClient } from '@/api/auth/apiClient';
import { useUserStore } from '@/store/LoginStore';
import { ModalRoot } from '@/components/modal/ModalRoot';
import Image from 'next/image';

interface ProfileSectionProps {
  user: {
    id: number;
    nickname: string;
    email: string;
    profileImageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
  const { addCurrentUser } = useUserStore();

  const [nickname, setNickname] = useState(user.nickname);
  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    user.profileImageUrl || '',
  );
  const [isSaving, setIsSaving] = useState(false);

  // 모달 상태
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      let profileImageUrl = user.profileImageUrl || '';

      // 이미지가 변경된 경우 먼저 이미지 업로드
      if (fileInputRef.current?.files?.[0]) {
        console.log('📤 이미지 업로드 시작...');

        const imageFormData = new FormData();
        imageFormData.append('image', fileInputRef.current.files[0]);

        const imageResponse = await apiClient.post('users/me/image', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('✅ 이미지 업로드 성공:', imageResponse.data);
        profileImageUrl = imageResponse.data.profileImageUrl;
      }

      // 프로필 정보 업데이트 (JSON)
      console.log('📝 프로필 정보 업데이트 시작...');

      const updateData: { nickname: string; profileImageUrl?: string } = {
        nickname: nickname,
      };

      // 이미지 URL이 있는 경우에만 포함
      if (profileImageUrl) {
        updateData.profileImageUrl = profileImageUrl;
      }

      const response = await apiClient.put('users/me', updateData);

      console.log('✅ 프로필 업데이트 성공:', response.data);

      // Zustand 스토어 업데이트
      addCurrentUser({
        ...user,
        nickname: response.data.nickname,
        profileImageUrl: response.data.profileImageUrl || '',
        createdAt: user.createdAt || '',
        updatedAt: user.updatedAt || '',
      });

      setIsSuccessModalOpen(true);
    } catch (err: unknown) {
      console.error('❌ 프로필 수정 실패:', err);

      // 더 자세한 에러 정보 출력
      const axiosError = err as { response?: { data?: { message?: string }; status?: number } };
      console.log('❌ 에러 상세:', axiosError.response?.data);
      console.log('❌ 에러 상태:', axiosError.response?.status);

      if (axiosError.response?.status === 400) {
        setErrorMessage('입력한 정보를 확인해주세요.');
      } else if (axiosError.response?.status === 401) {
        setErrorMessage('로그인이 필요합니다.');
      } else {
        setErrorMessage('프로필 수정에 실패했습니다.');
      }
      setIsErrorModalOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* 프로필 이미지와 입력 필드 영역 - 반응형 */}
      <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
        {/* 프로필 이미지 섹션 - 반응형 크기 */}
        <div className='relative flex-shrink-0 mx-auto md:mx-0'>
          {profileImagePreview ? (
            <Image
              src={profileImagePreview}
              alt='프로필 이미지'
              width={182}
              height={182}
              className='w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[182px] lg:h-[182px] rounded-lg object-cover border border-gray-200'
            />
          ) : (
            <div className='w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[182px] lg:h-[182px] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center'>
              <div className='w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gray-300 rounded-full flex items-center justify-center'>
                <span className='text-gray-600 text-lg md:text-xl font-semibold'>
                  {user.nickname[0]}
                </span>
              </div>
            </div>
          )}

          {/* + 버튼 (오버레이) - 반응형 크기 */}
          <button
            onClick={handleImageClick}
            className='absolute bottom-1 right-1 md:bottom-2 md:right-2 w-8 h-8 md:w-10 md:h-10 bg-[#5534DA] text-white rounded-lg flex items-center justify-center hover:bg-[#4a2bb8] transition-colors shadow-lg'
          >
            <span className='text-lg md:text-xl font-light'>+</span>
          </button>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
          />
        </div>

        {/* 입력 필드 섹션 - 반응형 */}
        <div className='flex-1 space-y-4 md:space-y-6'>
          {/* 이메일 필드 */}
          <div>
            <label className='block text-sm font-medium text-gray-900 mb-2'>이메일</label>
            <input
              type='email'
              value={user.email}
              disabled
              className='w-full h-10 md:h-12 px-3 md:px-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed text-sm'
            />
          </div>

          {/* 닉네임 필드 */}
          <div>
            <label className='block text-sm font-medium text-gray-900 mb-2'>닉네임</label>
            <input
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={isSaving}
              className='w-full h-10 md:h-12 px-3 md:px-4 border border-gray-300 rounded-lg focus:border-[#5534DA] focus:outline-none transition-colors disabled:opacity-50 text-sm'
              placeholder='닉네임을 입력하세요'
            />
          </div>
        </div>
      </div>

      {/* 저장 버튼 - 반응형 */}
      <div>
        <button
          onClick={handleSave}
          disabled={isSaving || !nickname.trim()}
          className='w-full h-10 md:h-12 bg-[#5534DA] text-white rounded-lg hover:bg-[#4a2bb8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm'
        >
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>

      {/* 성공 모달 */}
      <ModalRoot
        modalOpenState={isSuccessModalOpen}
        modalOpenSetState={setIsSuccessModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-gray-800 text-lg'>프로필이 성공적으로 수정되었습니다.</p>
          </div>
          <div className='pb-6'>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className='w-[240px] h-[48px] bg-[#5534DA] text-white rounded-lg hover:bg-[#4a2bb8] transition-colors'
            >
              확인
            </button>
          </div>
        </div>
      </ModalRoot>

      {/* 실패 모달 */}
      <ModalRoot
        modalOpenState={isErrorModalOpen}
        modalOpenSetState={setIsErrorModalOpen}
        title=''
        meatballMenu={false}
        modalButtonType='none'
      >
        <div className='flex flex-col justify-center items-center h-[192px] w-[368px] -m-6'>
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-gray-800 text-lg'>{errorMessage}</p>
          </div>
          <div className='pb-6'>
            <button
              onClick={() => setIsErrorModalOpen(false)}
              className='w-[240px] h-[48px] bg-[#5534DA] text-white rounded-lg hover:bg-[#4a2bb8] transition-colors'
            >
              확인
            </button>
          </div>
        </div>
      </ModalRoot>
    </div>
  );
};

export default ProfileSection;
