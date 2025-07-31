import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, MouseEvent } from 'react';

interface InputType extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  type: 'text' | 'password' | 'title' | 'email';
  placeholder: string;
  icon?: React.ReactNode;
  iconOnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// const inputType = {
//   text: 'text',
//   password: 'password',
//   title: 'text',
//   email: 'email',
// };

export const Input = forwardRef<HTMLInputElement, InputType>((props, ref) => {
  const { type, placeholder, value, onChange, className, iconOnClick, ...restProps } = props;
  return (
    <div className='relative'>
      <input
        type={type === 'title' ? 'text' : type}
        ref={ref}
        className={`${type === 'title' && 'font-bold'} w-full p-3.5 rounded-lg border border-gray-200 bg-white text-black invalid:border-red-500 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...restProps}
      />
      <button
        onClick={iconOnClick}
        className='absolute top-1/2 -translate-y-1/2 right-4'
        tabIndex={1}
      >
        {props.icon}
      </button>
    </div>
  );
});

Input.displayName = 'Input';
