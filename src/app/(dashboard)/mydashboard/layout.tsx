import { GnbMyDashboard } from '@/components/gnb/GnbMyDashboard';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-1'>
      <GnbMyDashboard />
      {children}
    </div>
  );
}
