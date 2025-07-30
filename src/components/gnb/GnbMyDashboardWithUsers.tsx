import {
  BIG_DISPLAY,
  BIGGER_USERS_DISPLAY,
  SMALL_DISPLAY,
  SMALLER_USERS_DISPLAY,
} from '@/constants/windowWidth';
import { useWindowSize } from '@/hooks/useWindowSize';
import GnbWrapper from './GnbWrapper';
import { Button } from '../button/Button';
import { UserChipArray } from '../chip/UserChipArray';
import { UserChip } from '../chip/UserChip';
import SettingIcon from '../../../public/icon/settings.svg';
import InviteIcon from '../../../public/icon/invitation.svg';
import { UserType } from '@/types/UserTypes';

export const GnbMyDashboardWithUsers = ({ user, users }: { user: UserType; users: UserType[] }) => {
  const { width } = useWindowSize();
  if (width === undefined) return;
  const maxVisible = width > BIG_DISPLAY ? BIGGER_USERS_DISPLAY : SMALLER_USERS_DISPLAY;

  return (
    <GnbWrapper>
      <div className='flex-1'>
        {width > SMALL_DISPLAY && <h1 className='font-bold text-md md:text-xl'>내 대시보드</h1>}
      </div>
      <div className='flex gap-2'>
        <Button size='extraSmall' type='gnb'>
          {width > SMALL_DISPLAY && <SettingIcon />}
          관리
        </Button>
        <Button size='extraSmall' type='gnb'>
          {width > SMALL_DISPLAY && <InviteIcon />}
          초대하기
        </Button>
      </div>
      <UserChipArray
        users={users}
        maxVisible={maxVisible}
        size={width > SMALL_DISPLAY ? 'large' : 'small'}
      />
      <div className='border-l border-l-gray-200 h-full' />
      <div>
        <UserChip user={user} size='large' hideName={width > SMALL_DISPLAY ? false : true} />
      </div>
    </GnbWrapper>
  );
};
