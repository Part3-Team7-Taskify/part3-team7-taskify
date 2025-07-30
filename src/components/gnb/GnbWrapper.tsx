const GnbWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className='w-full flex items-center h-[70px] px-6 py-3 gap-4 md:gap-8 lg:gap-8 border-b border-b-gray-300'>
      {children}
    </nav>
  );
};

export default GnbWrapper;
