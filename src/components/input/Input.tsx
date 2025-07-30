import { ChangeEvent, forwardRef } from 'react';

interface InputType {
  type: 'text' | 'password' | 'title' | 'email';
  placeholder: string;
  icon?: React.ReactNode;
  iconOnClick?: () => void;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// const inputType = {
//   text: 'text',
//   password: 'password',
//   title: 'text',
//   email: 'email',
// };

export const Input = forwardRef<HTMLInputElement, InputType>((props, ref) => (
  <div className='relative'>
    <input
      ref={ref}
      {...props}
      className={`${props.type === 'title' && 'font-bold'} w-full p-3.5 rounded-lg border border-gray-200 bg-white text-black invalid:border-red-500`}
    />
    <button onClick={props.iconOnClick} className='absolute top-1/2 -translate-y-1/2 right-4'>
      {props.icon}
    </button>
  </div>
));

Input.displayName = 'Input';
