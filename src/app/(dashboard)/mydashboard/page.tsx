import AddDashboardButton from '@/components/button/AddDashboardButton';
import NoInvitationIcon from '../../../../public/icons/icon_mailForbidden.svg';

export default function Dashboard() {
  return (
    <section className='bg-gray-500 p-4 sm:p-6'>
      <AddDashboardButton />
      <div className='h-[390px] bg-white rounded-xl px-10 py-6 mt-6'>
        <h2 className='text-2xl font-bold'>초대받은 대시보드</h2>
        <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
          <NoInvitationIcon />
          <span className='text-gray-200'>아직 초대받은 대시보드가 없어요</span>
        </div>
      </div>
    </section>
  );
}
