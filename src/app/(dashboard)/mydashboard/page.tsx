import AddDashboardButton from '@/components/button/AddDashboardButton';
import NoInvitationIcon from '../../../../public/icons/icon_mailForbidden.svg';
import { getInvitationList } from '@/api/mydashboard/apis';
import InvitedDashboardList from './InvitedDashboardList';
// import { mockInvitations } from './mockdata';

export default async function Page() {
  const { invitations } = await getInvitationList();

  return (
    <section className='bg-gray-500 p-4 sm:p-6'>
      <AddDashboardButton />
      <div className='max-w-[1022px] h-full bg-white rounded-xl py-8 mt-6'>
        <h2 className='pl-8 text-2xl font-bold'>초대받은 대시보드</h2>
        <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
          {invitations.length <= 0 || !invitations ? (
            <>
              <NoInvitationIcon />
              <span className='text-gray-200'>아직 초대받은 대시보드가 없어요</span>
            </>
          ) : (
            <InvitedDashboardList inviteList={invitations} />
          )}
        </div>
      </div>
    </section>
  );
}
