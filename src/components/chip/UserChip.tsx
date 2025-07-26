'use client';

import { UserType } from '@/types/UserTypes';
import { useEffect, useState } from 'react';

type SizeType = 'large' | 'small';

export const UserChip = ({
  user,
  size,
  hideName,
  className,
}: {
  user: UserType;
  size: SizeType;
  hideName: boolean;
  className?: string;
}) => {
  const [bgColor, setBgColor] = useState('bg-white');

  const smallClasses = 'w-6 h-6';
  const largeClasses = 'w-8 h-8';

  const sizeClasses = {
    large: largeClasses,
    small: smallClasses,
  };

  const colors = [
    'bg-[#9ECAD6]',
    'bg-[#748DAE]',
    'bg-[#F5CBCB]',
    'bg-[#FFEAEA]',
    'bg-[#A3DC9A]',
    'bg-[#DEE791]',
    'bg-[#FFF9BD]',
    'bg-[#FFD6BA]',
  ];

  const isBright = (color: string) => {
    const redHex = color.substring(5, 7);
    const greenHex = color.substring(7, 9);
    const blueHex = color.substring(9, 11);

    const redNumber = parseInt(redHex, 16);
    const greenNumber = parseInt(greenHex, 16);
    const blueNumber = parseInt(blueHex, 16);

    if ((redNumber + greenNumber + blueNumber) / 3 > 127) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setBgColor(colors[bgColorIndex]);
  }, []);

  const bgColorIndex = Math.floor(Math.random() * 8);

  return (
    <div className={`flex items-center ${className}`}>
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={`${user.nickname}의 프로필 사진`}
          className={`rounded-full object-cover ${sizeClasses[size]} ${hideName && 'ring-2 ring-white'}`}
        />
      ) : (
        <div
          className={`grid place-items-center rounded-full ${sizeClasses[size]} ${bgColor} ${hideName && 'ring-2 ring-white'}`}
        >
          <span className={`${isBright(colors[bgColorIndex]) ? 'text-black' : 'text-white'}`}>
            {user.nickname.slice(0, 1)}
          </span>
        </div>
      )}
      {!hideName && <span className='ml-2 hidden md:block lg:block'>{user.nickname}</span>}
    </div>
  );
};
