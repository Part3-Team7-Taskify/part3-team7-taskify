export const ColumnChip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='px-2 py-1 w-fit flex items-center gap-2 rounded-2xl bg-violet-200 text-violet-600'>
      <div className='w-2 h-2 rounded-full bg-violet-600' />
      {children}
    </div>
  );
};
