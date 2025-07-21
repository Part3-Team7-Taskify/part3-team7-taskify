import Image from 'next/image';

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Header Navigation */}
      <header className='bg-black'>
        <nav className='py-4'>
          <div className='flex justify-between items-center px-4 md:px-8 lg:px-[100px]'>
            {/* Logo */}
            <div className='flex items-center'>
              <a href='/landing' className='flex items-center hover:opacity-80 transition-opacity'>
                <Image
                  src='/images/landing_logo.svg'
                  alt='Taskify 로고'
                  width={80}
                  height={26}
                  className='h-auto md:w-[100px] md:h-[33px] lg:w-[120px] lg:h-[40px]'
                />
              </a>
            </div>

            {/* Navigation Links */}
            <div className='flex items-center space-x-4 md:space-x-6 lg:space-x-8'>
              <a href='#' className='text-gray-300 hover:text-white text-sm lg:text-base'>
                로그인
              </a>
              <a href='#' className='text-gray-300 hover:text-white text-sm lg:text-base'>
                회원가입
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section - Mobile First */}
      <section className='bg-black py-8 md:py-12 lg:py-20'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          {/* Main Image */}
          <div className='flex justify-center mb-6 md:mb-8 lg:mb-12'>
            {/* Mobile - No background */}
            <div className='md:hidden'>
              <Image
                src='/images/desktop.png'
                alt='Taskify 팀 협업 일러스트'
                width={722}
                height={423}
                className='w-full h-auto max-w-sm'
                priority
              />
            </div>
            {/* Desktop - No background, fixed size */}
            <div className='hidden md:block'>
              <Image
                src='/images/desktop.png'
                alt='Taskify 팀 협업 일러스트'
                width={722}
                height={423}
                style={{ width: '722px', height: '423px' }}
                priority
              />
            </div>
          </div>

          {/* Title - Mobile First */}
          <h1 className='mb-6 md:mb-8'>
            <div className='mb-2 md:mb-0 md:inline'>
              <span
                className='font-bold text-white block md:inline'
                style={{
                  fontSize: '40px',
                  fontWeight: 700,
                  fontFamily: 'Pretendard',
                }}
              >
                <span className='md:hidden'>새로운 일정 관리</span>
                <span
                  className='hidden md:inline'
                  style={{
                    fontSize: '76px',
                    fontWeight: 700,
                    fontFamily: 'Pretendard',
                  }}
                >
                  새로운 일정 관리{' '}
                </span>
              </span>
            </div>
            <span
              className='font-bold text-[#5534DA] block md:inline md:leading-[65px]'
              style={{
                fontSize: '42px',
                fontWeight: 700,
                fontFamily: 'Montserrat',
              }}
            >
              <span className='md:hidden'>Taskify</span>
              <span
                className='hidden md:inline'
                style={{
                  fontSize: '90px',
                  fontWeight: 700,
                  fontFamily: 'Montserrat',
                  letterSpacing: '-1px',
                }}
              >
                Taskify
              </span>
            </span>
          </h1>

          {/* CTA Button */}
          <button
            className='bg-[#5534DA] hover:bg-[#4427b8] text-white rounded-lg font-medium transition-colors md:w-auto'
            style={{
              marginTop: '100px',
              width: '280px',
              height: '54px',
              fontSize: '18px',
              fontWeight: 500,
            }}
          >
            로그인하기
          </button>
        </div>
      </section>

      {/* Point 1 Section - Mobile First */}
      <section className='bg-black py-8 md:py-12 lg:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='bg-[#171717] rounded-lg mx-auto relative overflow-hidden w-full max-w-sm h-[600px] md:max-w-none md:w-full md:h-[600px] lg:w-[1200px] lg:h-[600px]'>
            {/* Mobile Layout - Stacked */}
            <div className='md:hidden p-6 text-center h-full flex flex-col relative'>
              <div
                className='text-[#5534DA] text-sm font-medium mb-6 mt-8'
                style={{ fontSize: '18px', fontWeight: 500, fontFamily: 'Pretendard' }}
              >
                Point 1
              </div>
              <h2
                className='text-4xl font-bold text-white leading-tight mb-12'
                style={{ fontWeight: 700 }}
              >
                일의 우선순위를
                <br />
                관리하세요
              </h2>
              {/* Point 1 이미지를 컨테이너 우측 하단에 절대 위치 */}
              <div className='absolute bottom-0 right-0'>
                <div style={{ width: '296px', height: '248px' }}>
                  <Image
                    src='/images/landing1.svg'
                    alt='칸반 보드 대시보드'
                    width={296}
                    height={248}
                    className='rounded-lg w-full h-full object-contain'
                    style={{ width: '296px', height: '248px' }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Layout - Side by side */}
            <div className='hidden md:flex items-center h-full p-8 lg:p-12'>
              {/* Text Content - Left */}
              <div className='flex flex-col justify-center w-1/2'>
                <div
                  className='text-[#5534DA] font-medium mb-4'
                  style={{ fontSize: '22px', fontWeight: 500 }}
                >
                  Point 1
                </div>
                <h2
                  className='font-bold mb-6 text-white'
                  style={{ fontSize: '48px', fontWeight: 700 }}
                >
                  일의 <span className='text-[#5534DA]'>우선순위</span>를<br />
                  관리하세요
                </h2>
              </div>
            </div>

            {/* Dashboard Image - Desktop positioning */}
            <div className='hidden md:block absolute bottom-0 right-0'>
              <Image
                src='/images/landing1.svg'
                alt='칸반 보드 대시보드'
                width={594}
                height={448}
                className='rounded-tl-lg'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Point 2 Section - Mobile First */}
      <section className='bg-black py-8 md:py-12 lg:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='bg-[#171717] rounded-lg mx-auto relative overflow-hidden w-full max-w-sm h-[600px] md:max-w-none md:w-full md:h-[600px] lg:w-[1200px] lg:h-[600px]'>
            {/* Mobile Layout - Stacked */}
            <div className='md:hidden p-6 text-center h-full flex flex-col relative'>
              <div
                className='text-[#5534DA] text-sm font-medium mb-6 mt-8'
                style={{ fontSize: '18px', fontWeight: 500, fontFamily: 'Pretendard' }}
              >
                Point 2
              </div>
              <h2
                className='text-4xl font-bold text-white leading-tight mb-12'
                style={{ fontWeight: 700 }}
              >
                해야 할 일을
                <br />
                등록하세요
              </h2>
              {/* Point 2 이미지를 컨테이너 하단 중앙에 절대 위치 */}
              <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
                <div style={{ width: '218px', height: '250px' }}>
                  <Image
                    src='/images/landing2.svg'
                    alt='할일 생성 폼'
                    width={218}
                    height={250}
                    className='rounded-lg w-full h-full object-contain'
                    style={{ width: '218px', height: '250px' }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Layout - Side by side */}
            <div className='hidden md:flex items-center h-full p-8 lg:p-12'>
              {/* Text Content - Right */}
              <div className='flex flex-col justify-center w-1/2 ml-auto'>
                <div
                  className='text-[#5534DA] font-medium mb-4'
                  style={{ fontSize: '22px', fontWeight: 500 }}
                >
                  Point 2
                </div>
                <h2
                  className='font-bold mb-6 text-white'
                  style={{ fontSize: '48px', fontWeight: 700 }}
                >
                  해야 할 일을
                  <br />
                  <span className='text-[#5534DA]'>등록</span>하세요
                </h2>
              </div>
            </div>

            {/* Task Form Image - Desktop positioning */}
            <div className='hidden md:block absolute bottom-0 left-27'>
              <Image
                src='/images/landing2.svg'
                alt='할일 생성 폼'
                width={436}
                height={502}
                className='rounded-tr-lg'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Settings Section - Mobile First */}
      <section className='bg-black py-8 md:py-12 lg:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          {/* Section Title */}
          <div className='text-center md:text-left mb-8 md:mb-12 lg:mb-16'>
            <h2 className='text-xl md:text-3xl lg:text-4xl font-bold text-white'>
              생산성을 높이는 다양한 설정 <span className='text-[#5534DA]'>⚡</span>
            </h2>
          </div>

          {/* Settings Grid - Mobile First: Single column, Desktop: 3 columns */}
          <div className='space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8'>
            {/* Dashboard Setting */}
            <div
              className='bg-[#5C5C5C] rounded-lg overflow-hidden flex flex-col mx-auto w-full md:max-w-none md:w-full lg:w-[378px] lg:h-[384px]'
              style={{ width: '343px', maxWidth: '343px' }}
            >
              <div
                className='bg-[#4B4B4B] flex items-center justify-center md:flex-1 md:p-6'
                style={{ height: '236px' }}
              >
                <Image
                  src='/images/landing3.svg'
                  alt='대시보드 설정 UI'
                  width={320}
                  height={132}
                  className='md:w-[300px] md:h-[124px]'
                />
              </div>
              <div
                className='bg-[#171717] flex items-center md:p-6'
                style={{ height: '113px', padding: '24px' }}
              >
                <div>
                  <h3
                    className='font-bold mb-2 md:mb-3 text-white md:text-xl'
                    style={{ fontSize: '18px', fontWeight: 700 }}
                  >
                    대시보드 설정
                  </h3>
                  <p
                    className='text-gray-400 md:text-sm'
                    style={{ fontSize: '16px', fontWeight: 500 }}
                  >
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </p>
                </div>
              </div>
            </div>

            {/* Invitation */}
            <div
              className='bg-[#5C5C5C] rounded-lg overflow-hidden flex flex-col mx-auto w-full md:max-w-none md:w-full lg:w-[378px] lg:h-[384px]'
              style={{ width: '343px', maxWidth: '343px' }}
            >
              <div
                className='bg-[#4B4B4B] flex items-center justify-center md:flex-1 md:p-1'
                style={{ height: '236px' }}
              >
                <Image
                  src='/images/landing4.svg'
                  alt='초대 관리 UI'
                  width={260}
                  height={200}
                  className='md:w-[300px] md:h-[220px]'
                />
              </div>
              <div
                className='bg-[#171717] flex items-center md:p-6'
                style={{ height: '113px', padding: '24px' }}
              >
                <div>
                  <h3
                    className='font-bold mb-2 md:mb-3 text-white md:text-xl'
                    style={{ fontSize: '18px', fontWeight: 700 }}
                  >
                    초대
                  </h3>
                  <p
                    className='text-gray-400 md:text-sm'
                    style={{ fontSize: '16px', fontWeight: 500 }}
                  >
                    새로운 팀원을 초대할 수 있어요.
                  </p>
                </div>
              </div>
            </div>

            {/* Members */}
            <div
              className='bg-[#5C5C5C] rounded-lg overflow-hidden flex flex-col mx-auto w-full md:max-w-none md:w-full md:col-span-2 lg:col-span-1 lg:w-[378px] lg:h-[384px]'
              style={{ width: '343px', maxWidth: '343px' }}
            >
              <div
                className='bg-[#4B4B4B] flex items-center justify-center md:flex-1 md:p-6'
                style={{ height: '236px' }}
              >
                <Image
                  src='/images/landing5.svg'
                  alt='구성원 관리 UI'
                  width={260}
                  height={169}
                  className='md:w-[320px] md:h-[220px]'
                  style={{ width: '260px', height: '169px' }}
                />
              </div>
              <div
                className='bg-[#171717] flex items-center md:p-6'
                style={{ height: '113px', padding: '24px' }}
              >
                <div>
                  <h3
                    className='font-bold mb-2 md:mb-3 text-white md:text-xl'
                    style={{ fontSize: '18px', fontWeight: 700 }}
                  >
                    구성원
                  </h3>
                  <p
                    className='text-gray-400 md:text-sm'
                    style={{ fontSize: '16px', fontWeight: 500 }}
                  >
                    구성원을 초대하고 내보낼 수 있어요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Mobile First */}
      <footer className='bg-black py-6 md:py-8'>
        <div className='max-w-7xl mx-auto px-4'>
          {/* Mobile Layout - Stacked */}
          <div className='md:hidden text-center space-y-4'>
            <div className='text-gray-400 text-sm'>©codeit - 2023</div>
            <div className='flex justify-center space-x-6'>
              <a href='#' className='text-gray-400 hover:text-white text-sm'>
                Privacy Policy
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-sm'>
                FAQ
              </a>
            </div>
            <div className='flex justify-center space-x-4'>
              <a href='#' className='text-gray-400 hover:text-white'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className='hidden md:flex justify-between items-center'>
            <div className='text-gray-400 text-sm'>©codeit - 2023</div>
            <div className='flex space-x-6'>
              <a href='#' className='text-gray-400 hover:text-white text-sm'>
                Privacy Policy
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-sm'>
                FAQ
              </a>
            </div>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-400 hover:text-white'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
