import Image from 'next/image';
interface assigneeInterface {
  profileImageUrl: string;
  nickname: string;
  id: number;
}
interface Props {
  key: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
  columnId: number;
  assignee: assigneeInterface;
}

const Cards = ({ title, description, dueDate, tags, imageUrl, assignee }: Props) => {
  const DateCustom = dueDate.split(' ')[0];
  const nickNameChar = assignee.nickname.charAt(0);
  return (
    <div className='lg:flex-col lg:items-start sm:flex-row sm:justify-start sm:gap-[20px] flex justify-between sm:items-center flex-col gap-[6px] rounded-md border border-gray-300 bg-white px-[20px] py-[16px] relative'>
      {imageUrl && (
        <p className='lg:w-full lg:h-[160px] sm:w-[90px] sm:h-[53px] relative w-full h-[151px]'>
          <Image src={imageUrl} fill alt={title} className='object-cover rounded-md' />
        </p>
      )}
      <div className='flex flex-col gap-[6px]'>
        <p className='text-sec-black font-semibold text-[16px]'>{title}</p>
        <div className='lg:flex-col lg:items-start sm:flex-row sm:items-center flex flex-col gap-[6px]'>
          <p className='flex gap-[6px]'>
            {tags.map((tag, index) => (
              <span
                className='rounded-sm px-[6px] py-[2px] bg-amber-100 text-amber-600'
                key={index}
              >
                {tag}
              </span>
            ))}
          </p>
          <p className='flex gap-[4px] font-medium text-[12px] text-gray-100'>
            <Image src='/icons/icon_calendar.svg' alt='달력 아이콘' width={14} height={14} />
            {DateCustom}
          </p>
        </div>
      </div>

      {assignee.profileImageUrl !== null ? (
        <p>이미지</p>
      ) : (
        <p className='absolute bottom-[16px] right-[20px] flex justify-center items-center w-[22px] h-[22px] rounded-full bg-[#A3C4A2] text-[10px] text-white font-semibold'>
          {nickNameChar}
        </p>
      )}
    </div>
  );
};
export default Cards;
