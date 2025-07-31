'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ModalRoot } from './ModalRoot';
import { Input } from '@/components/input/Input';
import { Button } from '../button/Button';
import { postInvitation } from '@/api/mydashboard/apis';
import { useParams } from 'next/navigation';

type FormType = {
  email: string;
};

const InviteModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}) => {
  const {id: stringId} = useParams();
  const id = Number(stringId);

  const { register, handleSubmit } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = async (e) => {
    postInvitation(id, e.email).then(() => setIsVisible(false));
  };
  return (
    <ModalRoot
      title='초대하기'
      modalButtonType='none'
      modalOpenState={isVisible}
      modalOpenSetState={setIsVisible}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <label>
          이메일
          <Input
            type='email'
            placeholder='이메일을 입력해주세요.'
            {...register('email', { required: true })}
          />
        </label>
        <div className='w-full flex gap-2'>
          <Button variant='outline' className='w-full' onClick={() => setIsVisible(false)}>
            취소
          </Button>
          <Button variant='primary' className='w-full' onClick={handleSubmit(onSubmit)}>
            확인
          </Button>
        </div>
      </form>
    </ModalRoot>
  );
};

export default InviteModal;
