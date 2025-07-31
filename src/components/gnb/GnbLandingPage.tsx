import { SMALL_DISPLAY } from '@/constants/windowWidth';
import { useWindowSize } from '@/hooks/useWindowSize';
import LogoWhite from '../../../public/images/images_logo_white.png';
import LogoWhiteSmall from '../../../public/images/image_smallLogo_white.png';
import Image from 'next/image';
import Link from 'next/link';

export const GnbLandingPage = () => {
  const { width } = useWindowSize();
  if (width === undefined) return;

  return (
    <nav className='w-full h-[70px] flex items-center px-5 md:px-10 lg:px-20 py-3 gap-8 bg-black text-white'>
      <div className='flex-1'>
        {width > SMALL_DISPLAY ? (
          <Image src={LogoWhite} alt='Global Navigation Bar 로고 화이트 버전' />
        ) : (
          <Image src={LogoWhiteSmall} alt='Global Navigation Bar 로고 화이트 버전' />
        )}
      </div>
      <>
        <Link href='/login'>로그인</Link>
        <Link href='/signup' className='ml-2'>
          회원가입
        </Link>
      </>
    </nav>
  );
};
