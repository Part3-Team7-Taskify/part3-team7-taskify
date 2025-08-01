import Image from 'next/image';
import NotFoundLogo from '../../../public/images/NotFound.png';

const NotFound = () => {
  return (
    <main className='w-screen h-screen grid place-items-center'>
      <div className='w-2xl text-center space-y-6'>
        <Image src={NotFoundLogo} alt='찾을 수 없습니다 이미지' />
        <span className='text-2xl-bold'>🤔 페이지를 찾을 수 없어요!</span>
      </div>
    </main>
  );
};

export default NotFound;
