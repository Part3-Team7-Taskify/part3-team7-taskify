import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { RouterProvider } from '@/contexts/RouterContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Taskify',
  description: '오늘도 만나서 반가워요!',
  // icons: {
  //   icon: '/favicon.icon',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <RouterProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <div id='portal' className='absolute top-0 left-0' />
        </body>
      </RouterProvider>
    </html>
  );
}
