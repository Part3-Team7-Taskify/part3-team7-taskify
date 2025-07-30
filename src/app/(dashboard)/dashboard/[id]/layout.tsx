import { getMembers } from '@/api/gnb/apis';
import { getSingleDashboard } from '@/api/snb/apis';
import GnbDashboard from '@/components/gnb/GnbDashboard';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: stringId } = await params;
  const id = parseInt(stringId);
  const dashboardInfo = await getSingleDashboard(id);
  const { members } = await getMembers(id);

  return (
    <div className='flex-1 h-screen overflow-hidden'>
      <GnbDashboard
        users={members}
        title={dashboardInfo.title}
        createdByMe={dashboardInfo.createdByMe}
      />
      {children}
    </div>
  );
}
