export interface UserType {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

type SizeType = 'large' | 'small';

export const UserChip = ({ user, size }: { user: UserType; size: SizeType }) => {
  const smallClasses = 'w-6 h-6';
  const largeClasses = 'w-8 h-8';

  const sizeClasses = {
    large: largeClasses,
    small: smallClasses,
  };

  return (
    <div className='flex items-center'>
      <img
        src={user.profileImageUrl}
        alt={`${user.nickname}의 프로필 사진`}
        className={`rounded-full ${sizeClasses[size]}`}
      />
      <span className='ml-2 hidden md:block lg:block'>{user.nickname}</span>
    </div>
  );
};
