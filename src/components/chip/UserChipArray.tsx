'use client';

import { UserChip, UserType } from './UserChip';

export const UserChipArray = ({
  users,
  maxVisible = 4,
  size,
}: {
  users: UserType[];
  maxVisible: number;
  size: 'large' | 'small';
}) => {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  const smallClasses = 'w-6 h-6';
  const largeClasses = 'w-8 h-8';

  const sizeClasses = {
    large: largeClasses,
    small: smallClasses,
  };

  return (
    <div className='flex '>
      {visibleUsers.map((el) => (
        <UserChip size={size} user={el} key={el.id} hideName={true} className='not-first:-ml-2' />
      ))}
      {remainingCount > 0 && (
        <div
          className={`${sizeClasses[size]} grid place-items-center not-first:-ml-2 rounded-full ring-2 ring-white bg-amber-300 text-amber-700`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
