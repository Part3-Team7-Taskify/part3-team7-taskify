'use client';

import { UserType } from '@/types/UserTypes';
import MeatballDropdown from '../dropdown/MeatballDropdown';
import { UserChip } from '../chip/UserChip';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/utils/cookies';

const GnbUserDropdown = ({ user }: { user: UserType }) => {
  const router = useRouter();
  const logout = () => {
    deleteCookie('accessToken');
    localStorage.clear();
    router.push('/login');
  };
  return (
    <MeatballDropdown.Root className='right-0 w-32'>
      <MeatballDropdown.Trigger>
        <UserChip user={user} size='large' hideName={false} />
      </MeatballDropdown.Trigger>
      <MeatballDropdown.Content>
        <MeatballDropdown.Item onClick={() => router.push('/mydashboard')}>
          나의 대시보드
        </MeatballDropdown.Item>
        <div className='w-full border-b border-b-gray-300' />
        <MeatballDropdown.Item onClick={logout}>로그아웃</MeatballDropdown.Item>
      </MeatballDropdown.Content>
    </MeatballDropdown.Root>
  );
};

export default GnbUserDropdown;
