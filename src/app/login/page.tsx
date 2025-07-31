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
import { setCookie } from '@/utils/cookies';

type LoginFormType = {
  email: string;
  password: string;
};

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { router } = useRouterContext();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginFormType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginFormType> = async (e) => {
    try {
      const response = await apiClient.post('auth/login', e);
      if (response.status === 201) {
        setCookie('accessToken', response.data.accessToken);
        setAccessToken(response.data.accessToken);
        router.push(ROUTES.MY_DASHBOARD);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(`로그인 오류: `, err.status);
        if (err.status === 404) {
          setError('root', { type: 'manual', message: '존재하지 않는 유저입니다.' });
        } else if (err.status === 400) {
          setError('root', { type: 'manual', message: '이메일 형식으로 작성해주세요.' });
        } else {
          setError('root', { type: 'manual', message: '로그인 오류입니다.' });
        }
      }
    }
  };
  return (
    <main className='w-screen h-screen grid place-items-center'>
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
          <label className='w-full'>
            <span>비밀번호</span>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='비밀번호를 입력해 주세요'
              icon={showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
              iconOnClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              {...register('password', { required: true })}
            />
          </label>
          <Button variant={!isDirty || !isValid ? 'disabled' : 'primary'} className='w-full mt-4'>
            로그인
          </Button>
        </form>
        <span className='text-sm'>
          회원이 아니신가요?{' '}
          <Link href={'/signup'} className='underline text-pri'>
            회원가입하기
          </Link>
        </span>
      </section>
    </main>
  );
};
export default Page;
