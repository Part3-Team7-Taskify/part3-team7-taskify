import { ComponentPropsWithoutRef, FC } from 'react';

interface InputType extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  type: 'text' | 'password' | 'title' | 'email';
  placeholder: string;
  icon?: React.ReactNode;
  iconOnClick?: () => void;
  className?: string;
}

export const Input: FC<InputType> = ({
  type,
  placeholder,
  icon,
  iconOnClick,
  className,
  ...rest
}) => {
  const inputType = {
    text: 'text',
    password: 'password',
    title: 'text',
    email: 'email',
  };
  return (
    <div className='relative w-full'>
      <input
        type={inputType[type]}
        placeholder={placeholder}
        className={`${type === 'title' && 'font-bold'} w-full p-3.5 rounded-lg border border-gray-200 bg-white text-black invalid:border-red-500 ${className}`}
        {...rest}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (iconOnClick) iconOnClick();
        }}
        tabIndex={1}
        className='absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'
      >
        {icon}
      </button>
    </div>
  );
};
