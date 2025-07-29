'use client';

import { Button } from '../button/Button';
import SettingIcon from '../../../public/icon/settings.svg';
import InviteIcon from '../../../public/icon/invitation.svg';
import CrownIcon from '../../../public/icon/crown.svg';
import LogoWhite from '../../../public/images/images_logo_white.png';
import LogoWhiteSmall from '../../../public/images/image_smallLogo_white.png';
import { UserChip } from '../chip/UserChip';
import { UserChipArray } from '../chip/UserChipArray';
import Image from 'next/image';
import Link from 'next/link';
import { useWindowSize } from '@/hooks/useWindowSize';
import { UserType } from '@/types/UserTypes';

const SMALL_DISPLAY = 768;
const BIG_DISPLAY = 1024;
const SMALLER_USERS_DISPLAY = 2;
const BIGGER_USERS_DISPLAY = 4;

const GnbWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className='w-full h-[70px] flex items-center px-6 py-3 gap-4 md:gap-8 lg:gap-8 border-b border-b-gray-300'>
      {children}
    </nav>
  );
};

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

export const GnbMyDashboard = ({ user }: { user: UserType }) => {
  const { width } = useWindowSize();
  if (width === undefined) return;

  return (
    <GnbWrapper>
      <div className='flex-1'>
        <h1 className='font-bold text-md md:text-xl'>내 대시보드</h1>
      </div>
      <div className='flex gap-2'>
        <Button size='extraSmall' type='gnb'>
          {width > SMALL_DISPLAY && <SettingIcon />}
          관리
        </Button>
        <Button size='extraSmall' type='gnb'>
          {width > SMALL_DISPLAY && <InviteIcon />}
          초대하기
        </Button>
      </div>
      <div className='border-l border-l-gray-200 h-full' />
      <div>
        <UserChip user={user} size='large' hideName={width > SMALL_DISPLAY ? false : true} />
      </div>
    </GnbWrapper>
  );
};

export const GnbMyDashboardWithUsers = ({ user, users }: { user: UserType; users: UserType[] }) => {
  const { width } = useWindowSize();
  if (width === undefined) return;
  const maxVisible = width > BIG_DISPLAY ? BIGGER_USERS_DISPLAY : SMALLER_USERS_DISPLAY;

  return (
    <GnbWrapper>
      <div className='flex-1'>
        {width > SMALL_DISPLAY && <h1 className='font-bold text-md md:text-xl'>내 대시보드</h1>}
      </div>
      <div className='flex gap-2'>
        <Button size='extraSmall' type='gnb'>
          {width > SMALL_DISPLAY && <SettingIcon />}
          관리
        </Button>
        <Button size='extraSmall' type='gnb'>
          {width > SMALL_DISPLAY && <InviteIcon />}
          초대하기
        </Button>
      </div>
      <UserChipArray
        users={users}
        maxVisible={maxVisible}
        size={width > SMALL_DISPLAY ? 'large' : 'small'}
      />
      <div className='border-l border-l-gray-200 h-full' />
      <div>
        <UserChip user={user} size='large' hideName={width > SMALL_DISPLAY ? false : true} />
      </div>
    </GnbWrapper>
  );
};

export const GnbDashboard = ({
  user,
  users,
  title,
  createdByMe,
}: {
  user: UserType;
  users: UserType[];
  title: string;
  createdByMe: boolean;
}) => {
  const { width } = useWindowSize();
  if (width === undefined) return;
  const maxVisible = width > BIG_DISPLAY ? BIGGER_USERS_DISPLAY : SMALLER_USERS_DISPLAY;

  return (
    <GnbWrapper>
      <div className='flex-1 flex gap-2 items-center'>
        {width > SMALL_DISPLAY && (
          <>
            <h1 className='font-bold text-md md:text-xl'>{title}</h1>
            {createdByMe && <CrownIcon />}
          </>
        )}
      </div>
      <div className='flex gap-2'>
        <Button size='extraSmall' type='gnb'>
          {width > SMALL_DISPLAY && <SettingIcon />}
          관리
        </Button>
        <Button size='extraSmall' type='gnb'>
          {width > SMALL_DISPLAY && <InviteIcon />}
          초대하기
        </Button>
      </div>
      <UserChipArray
        users={users}
        maxVisible={maxVisible}
        size={width > SMALL_DISPLAY ? 'large' : 'small'}
      />
      <div className='border-l border-l-gray-200 h-full' />
      <div>
        <UserChip
          user={user}
          size={width > SMALL_DISPLAY ? 'large' : 'small'}
          hideName={width > SMALL_DISPLAY ? false : true}
        />
      </div>
    </GnbWrapper>
  );
};
