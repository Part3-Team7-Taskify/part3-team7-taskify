'use client';

import { useState } from 'react';

interface PasswordChangeSectionProps {
  onPasswordChange: (currentPassword: string, newPassword: string) => Promise<void>;
}

const PasswordChangeSection = ({ onPasswordChange }: PasswordChangeSectionProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  // 새 비밀번호 확인 필드에서 onChange 처리
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // 일치할 때 즉시 에러 제거
    if (newPassword === value) {
      setPasswordError('');
    }
  };

  // 새 비밀번호 확인 필드에서 focus out 시 검증 (기존 로직 유지)
  const handleConfirmPasswordBlur = () => {
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  // 모든 필드가 채워졌는지 확인
  const isFormValid =
    currentPassword.trim() &&
    newPassword.trim() &&
    confirmPassword.trim() &&
    newPassword === confirmPassword;

  // 비밀번호 변경 처리
  const handlePasswordChange = async () => {
    if (!isFormValid) return;

    setIsChanging(true);
    try {
      await onPasswordChange(currentPassword, newPassword);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      // 폼 초기화
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
    } catch (error: unknown) {
      const errorObj = error as { message?: string };
      if (errorObj.message === 'INVALID_CURRENT_PASSWORD') {
        alert('현재 비밀번호가 틀립니다.');
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className='bg-white rounded-lg p-6'>
      <h2 className='text-xl font-bold mb-6'>비밀번호 변경</h2>

      {/* 현재 비밀번호 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>현재 비밀번호</label>
        <input
          type='password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder='현재 비밀번호 입력'
          className='w-full p-3 border border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none'
        />
      </div>

      {/* 새 비밀번호 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>새 비밀번호</label>
        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='새 비밀번호 입력'
          className='w-full p-3 border border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none'
        />
      </div>

      {/* 새 비밀번호 확인 */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>새 비밀번호 확인</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          placeholder='새 비밀번호 입력'
          className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
            passwordError
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-violet-500'
          }`}
        />
        {passwordError && (
          <p className='mt-2 text-sm text-red-500 transition-opacity duration-300'>
            {passwordError}
          </p>
        )}
      </div>

      {/* 변경 버튼 */}
      <button
        onClick={handlePasswordChange}
        disabled={!isFormValid || isChanging}
        className='px-6 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isChanging ? '변경 중...' : '변경'}
      </button>
    </div>
  );
};

export default PasswordChangeSection;
