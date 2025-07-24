'use client';
import Image from 'next/image';
import Logo from '../../../public/images/login_logo.png';
import ShowPasswordIcon from '../../../public/icon/icon_pass_visible.svg';
import HidePasswordIcon from '../../../public/icon/icon_pass_invisible.svg';
import { Input } from '@/components/input/Input';
import { useState } from 'react';
import { Button } from '@/components/button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { apiClient } from '@/api/auth/apiClient';
import { setAccessToken } from '@/utils/tokenhandler';
import { useRouterContext } from '@/contexts/RouterContext';
import { ROUTES } from '@/constants/router';
import { AxiosError } from 'axios';
import { ModalRoot } from '@/components/modal/ModalRoot';

type SignupFormType = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { router } = useRouterContext();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<SignupFormType>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<SignupFormType> = async (e) => {
    try {
      const response = await apiClient.post('users', e);
      if (response.status === 201) {
        setAccessToken(response.data.accessToken);
        setIsModalVisible(true);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(`로그인 오류: `, err.status);
        if (err.status === 404) {
          setError('root', { type: 'manual', message: '존재하지 않는 유저입니다.' });
        } else if (err.status === 409) {
          setError('root', { type: 'manual', message: '이미 사용중인 이메일입니다.' });
        } else {
          setError('root', { type: 'manual', message: '로그인 오류입니다.' });
        }
      }
    }
  };
  return (
    <>
      <main>
        <section className='w-[351px] md:w-[520px] grid place-items-center gap-4'>
          <Image src={Logo} alt='Taskify 로고' priority={true} />
          <span>오늘도 만나서 반가워요!</span>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full grid gap-4'>
            <label className='w-full relative'>
              <span>이메일</span>
              <Input
                type='email'
                placeholder='이메일을 입력해 주세요'
                {...register('email', { required: true })}
              />
              {errors.root && (
                <span className='absolute right-0 top-20 text-red-500'>{errors.root.message}</span>
              )}
            </label>
            <label className='w-full relative'>
              <span>닉네임</span>
              <Input
                type='text'
                placeholder='닉네임을 입력해 주세요'
                {...register('nickname', { required: true })}
              />
              {errors.root && (
                <span className='absolute right-0 top-20 text-red-500'>{errors.root.message}</span>
              )}
            </label>
            <label className='w-full relative'>
              <span>비밀번호</span>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='8자 이상 입력해 주세요'
                icon={showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                iconOnClick={() => setShowPassword(!showPassword)}
                {...register('password', { required: true })}
              />
            </label>
            <label className='w-full relative'>
              <span>비밀번호 확인</span>
              <Input
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder='비밀번호를 한번 더 입력해 주세요'
                icon={showPasswordConfirm ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                iconOnClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                {...register('passwordConfirm', { required: true })}
              />
            </label>
            <Button type={!isDirty || !isValid ? 'disabled' : 'primary'} className='w-full mt-4'>
              로그인
            </Button>
          </form>
          <span className='text-sm'>
            이미 회원이신가요?{' '}
            <Link href={'/login'} className='underline text-pri'>
              로그인하기
            </Link>
          </span>
        </section>
      </main>
      <ModalRoot
        modalButtonType='one'
        buttonCallback={() => {
          setIsModalVisible(false);
          router.push(ROUTES.DASHBOARD);
        }}
        modalOpenState={isModalVisible}
        modalOpenSetState={setIsModalVisible}
      >
        <span>가입이 완료되었습니다!</span>
      </ModalRoot>
    </>
  );
};
export default Page;
