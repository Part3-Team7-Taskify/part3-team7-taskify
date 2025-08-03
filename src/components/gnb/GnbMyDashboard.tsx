import GnbWrapper from './GnbWrapper';
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
      <GnbUserDropdown user={user} />
    </GnbWrapper>
  );
};
