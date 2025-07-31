import 'react-datepicker/dist/react-datepicker.css';
import SnbNav from '@/components/SnbNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen grid grid-cols-[68px_1fr] sm:grid-cols-[160px_1fr] lg:grid-cols-[300px_1fr] transition-[width]'>
      <SnbNav />
      <main className='overflow-scroll'>{children}</main>
    </div>
  );
}
