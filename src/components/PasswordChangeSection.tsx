'use client';

import { useState } from 'react';
import { ModalRoot } from '@/components/modal/ModalRoot';

interface PasswordChangeSectionProps {
  onPasswordChange: (currentPassword: string, newPassword: string) => Promise<void>;
}

const PasswordChangeSection = ({ onPasswordChange }: PasswordChangeSectionProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  // 모달 상태
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 폼 유효성 검사
  const isFormValid = currentPassword && newPassword && confirmPassword && !passwordError;

  // 비밀번호 확인 실시간 체크
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // 일치할 때만 에러 제거 (즉시 반응)
    if (newPassword === value) {
      setPasswordError('');
    }
  };

  // 비밀번호 확인 포커스 아웃 체크
  const handleConfirmPasswordBlur = () => {
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    }
  };

  // 비밀번호 변경 처리
  const handlePasswordChange = async () => {
    if (!isFormValid) return;

    setIsChanging(true);
    try {
      await onPasswordChange(currentPassword, newPassword);

      // 성공 시 폼 초기화
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');

      setIsSuccessModalOpen(true);
    } catch (error: unknown) {
      const errorObj = error as { message?: string };
      if (errorObj.message === 'INVALID_CURRENT_PASSWORD') {
        setErrorMessage('현재 비밀번호가 틀립니다.');
      } else {
        setErrorMessage('비밀번호 변경에 실패했습니다.');
      }
      setIsErrorModalOpen(true);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* 현재 비밀번호 */}
      <div>
        <label className='block text-sm font-medium text-gray-900 mb-2'>현재 비밀번호</label>
        <input
          type='password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={isChanging}
          className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-[#5534DA] focus:outline-none transition-colors disabled:opacity-50 text-sm'
          placeholder='비밀번호 입력'
        />
      </div>

      {/* 새 비밀번호 */}
      <div>
        <label className='block text-sm font-medium text-gray-900 mb-2'>새 비밀번호</label>
        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={isChanging}
          className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-[#5534DA] focus:outline-none transition-colors disabled:opacity-50 text-sm'
          placeholder='새 비밀번호 입력'
        />
      </div>

      {/* 새 비밀번호 확인 */}
      <div>
        <label className='block text-sm font-medium text-gray-900 mb-2'>새 비밀번호 확인</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          disabled={isChanging}
          className={`w-full h-12 px-4 border rounded-lg focus:outline-none transition-colors disabled:opacity-50 text-sm ${
            passwordError
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-[#5534DA]'
          }`}
          placeholder='새 비밀번호 입력'
        />

        {/* 에러 메시지 */}
        {passwordError && (
          <p className='mt-2 text-sm text-red-600 transition-opacity duration-200'>
            {passwordError}
          </p>
        )}
      </div>

      {/* 변경 버튼 - 입력폼과 같은 너비 */}
      <button
        onClick={handlePasswordChange}
        disabled={!isFormValid || isChanging}
        className='w-full h-12 bg-[#5534DA] text-white rounded-lg hover:bg-[#4a2bb8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm'
      >
        {isChanging ? '변경 중...' : '변경'}
      </button>

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
            <p className='text-gray-800 text-lg'>비밀번호가 성공적으로 변경되었습니다.</p>
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

export default PasswordChangeSection;
