import GnbWrapper from './GnbWrapper';
import { Button } from '../button/Button';
import SettingIcon from '../../../public/icon/settings.svg';
import InviteIcon from '../../../public/icon/invitation.svg';
import { getCurrentUser } from '@/api/gnb/apis';
import GnbUserDropdown from './GnbUserDropdown';

export const GnbMyDashboard = async () => {
  const user = await getCurrentUser();

  return (
    <GnbWrapper>
      <div className='flex-1'>
        <div className='hidden sm:flex sm:items-center sm:gap-2'>
          <h1 className='font-bold text-md md:text-xl'>내 대시보드</h1>
        </div>
      </div>
      <div className='flex gap-2'>
        <div className='sm:flex sm:items-center sm:gap-2'>
          <Button size='extraSmall' variant='gnb'>
            <div className='hidden sm:block'>
              <SettingIcon />
            </div>
            관리
          </Button>
        </div>
        <div className='sm:flex sm:items-center sm:gap-2'>
          <Button size='extraSmall' variant='gnb'>
            <div className='hidden sm:block'>
              <InviteIcon />
            </div>
            초대하기
          </Button>
        </div>
      </div>
      <div className='border-l border-l-gray-200 h-full' />
      <GnbUserDropdown user={user} />
    </GnbWrapper>
  );
};
