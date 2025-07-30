import { UserType } from '@/types/UserTypes';
import GnbWrapper from './GnbWrapper';
import CrownIcon from '../../../public/icon/crown.svg';
import { Button } from '../button/Button';
import { UserChipArray } from '../chip/UserChipArray';
import { UserChip } from '../chip/UserChip';
import SettingIcon from '../../../public/icon/settings.svg';
import InviteIcon from '../../../public/icon/invitation.svg';
import { getCurrentUser } from '@/api/gnb/apis';

export default async function GnbDashboard({
  users,
  title,
  createdByMe,
}: {
  users: UserType[];
  title: string;
  createdByMe: boolean;
}) {
  const user = await getCurrentUser();

  return (
    <GnbWrapper>
      <div className='flex-1 flex gap-2 items-center'>
        <div className='hidden sm:flex sm:items-center sm:gap-2'>
          <h1 className='font-bold text-md md:text-xl'>{title}</h1>
          {createdByMe && <CrownIcon />}
        </div>
      </div>
      <div className='flex gap-2'>
        <Button size='extraSmall' type='gnb'>
          <div className='hidden sm:flex sm:items-center sm:gap-2'>
            <SettingIcon />
            관리
          </div>
        </Button>
        <Button size='extraSmall' type='gnb'>
          <div className='hidden sm:flex sm:items-center sm:gap-2'>
            <InviteIcon />
            초대하기
          </div>
        </Button>
      </div>
      <UserChipArray users={users} />
      <div className='border-l border-l-gray-200 h-full' />
      <UserChip user={user} size='large' hideName={false} />
    </GnbWrapper>
  );
}
