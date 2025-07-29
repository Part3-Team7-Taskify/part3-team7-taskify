import { FC } from 'react';

interface InputType {
  type: 'text' | 'password' | 'title' | 'email';
  placeholder: string;
  icon?: React.ReactNode;
  iconOnClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const Input: FC<InputType> = ({ type, placeholder, icon, iconOnClick, onChange, value }) => {
  const inputType = {
    text: 'text',
    password: 'password',
    title: 'text',
    email: 'email',
  };
  return (
    <div className='relative'>
      <input
        type={inputType[type]}
        placeholder={placeholder}
        value={value}
        onChange={onChange} //
        className={`${type === 'title' && 'font-bold'} w-full p-3.5 rounded-lg border border-gray-200 bg-white text-black invalid:border-red-500`}
      />
      <button onClick={iconOnClick} className='absolute top-1/2 -translate-y-1/2 right-4'>
        {icon}
      </button>
    </div>
  );
};
