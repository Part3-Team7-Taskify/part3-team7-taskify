'use client';

import { apiClient } from '@/api/auth/apiClient';
import { useState, useRef } from 'react';
import Image from 'next/image';

interface ProfileSectionProps {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
  };
  onSave: (nickname: string, profileImage: File | null) => void;
}

const ProfileSection = ({ user, onSave }: ProfileSectionProps) => {
  const [nickname, setNickname] = useState(user.nickname);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    user.profileImageUrl,
  );
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 처리
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // + 버튼 클릭
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 저장 버튼
  const handleSave = async () => {
    setIsSaving(true);
    try {
      let updatedProfileImageUrl = user.profileImageUrl;

      // 1. 프로필 이미지가 변경된 경우 먼저 업로드
      if (profileImage) {
        const formData = new FormData();
        formData.append('image', profileImage);

        const imageResponse = await apiClient.post('users/me/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('이미지 업로드 성공:', imageResponse.data);
        // 서버에서 받은 새로운 이미지 URL 사용
        updatedProfileImageUrl = imageResponse.data.profileImageUrl;
      }

      // 2. 닉네임과 프로필 이미지 URL 함께 수정
      const updateResponse = await apiClient.put('users/me', {
        nickname: nickname,
        profileImageUrl: updatedProfileImageUrl, // 새로운 이미지 URL도 함께 전송!
      });

      console.log('프로필 수정 성공:', updateResponse.data);

      // 3. 성공 시 부모 컴포넌트에 업데이트된 정보 전달
      await onSave(nickname, profileImage);

      alert('프로필이 성공적으로 수정되었습니다.');
    } catch {
      console.error('프로필 수정 실패');
      alert('프로필 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 변경사항이 있는지 확인
  const hasChanges = nickname !== user.nickname || profileImage !== null;

  return (
    <div className='bg-white rounded-lg p-6 mb-6'>
      <h2 className='text-xl font-bold mb-6'>프로필</h2>

      {/* 프로필 이미지 */}
      <div className='mb-6 flex items-center gap-4'>
        <div className='relative'>
          {profileImagePreview ? (
            <Image
              src={profileImagePreview}
              alt='프로필 이미지'
              width={80}
              height={80}
              className='rounded-full object-cover'
            />
          ) : (
            <div className='w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-white'>
              {user.nickname.charAt(0).toUpperCase()}
            </div>
          )}

          {/* + 버튼 */}
          <button
            onClick={handleImageClick}
            className='absolute -bottom-2 -right-2 w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center text-xl hover:bg-violet-600'
          >
            +
          </button>
        </div>

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          className='hidden'
        />
      </div>

      {/* 이메일 (읽기 전용) */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>이메일</label>
        <input
          type='email'
          value={user.email}
          disabled
          className='w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-200'
        />
      </div>

      {/* 닉네임 */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>닉네임</label>
        <input
          type='text'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none'
          placeholder='닉네임을 입력하세요'
        />
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        disabled={!hasChanges || isSaving || !nickname.trim()}
        className='px-6 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSaving ? '저장 중...' : '저장'}
      </button>
    </div>
  );
};

export default ProfileSection;
