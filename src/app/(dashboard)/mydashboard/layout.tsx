import GnbMyDashboard from '@/components/gnb/GnbMyDashboard';

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-1'>
      <GnbMyDashboard />
      {children}
    </div>
  );
}
