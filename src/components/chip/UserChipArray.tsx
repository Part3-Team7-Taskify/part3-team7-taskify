'use client';

import { UserType } from '@/types/UserTypes';
import { UserChip } from './UserChip';
import { useWindowSize } from '@/hooks/useWindowSize';
import {
  BIGGER_USERS_DISPLAY,
  SMALL_DISPLAY,
  SMALLER_USERS_DISPLAY,
} from '@/constants/windowWidth';


export const UserChipArray = ({ users }: { users: UserType[] }) => {
  const { width } = useWindowSize();
  if (!width) return;
  const visibleUsers = users.slice(
    0,
    width > SMALL_DISPLAY ? SMALLER_USERS_DISPLAY : BIGGER_USERS_DISPLAY,
  );
  const remainingCount =
    users.length - (width > SMALL_DISPLAY ? SMALLER_USERS_DISPLAY : BIGGER_USERS_DISPLAY);

  const smallClasses = 'w-6 h-6';
  const largeClasses = 'w-8 h-8';

  const sizeClasses = {
    large: largeClasses,
    small: smallClasses,
  };

  return (
    <div className='flex '>
      {visibleUsers.map((el) => (
        <UserChip
          size={width > SMALL_DISPLAY ? 'large' : 'small'}
          user={el}
          key={el.id}
          hideName={true}
          className='not-first:-ml-2'
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={`${sizeClasses[width > SMALL_DISPLAY ? 'large' : 'small']} grid place-items-center not-first:-ml-2 rounded-full ring-2 ring-white bg-amber-300 text-amber-700`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
