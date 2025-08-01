'use client';
import { apiClient } from '@/api/auth/apiClient';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { setAccessToken } from '@/utils/tokenhandler';
import { LoginResponse } from '@/types/UserTypes';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/router';

interface FormField {
  label: string;
  name: string;
  type: string;
}

interface AuthFormProps {
  title: string;
  apiEndpoint: string;
  redirectPath: string;
  fields: FormField[];
  onSuccess?: (responseData: LoginResponse) => void;
}

export const AuthForm = ({ title, apiEndpoint, fields, onSuccess }: AuthFormProps) => {
  const initialValues = fields.reduce(
    (acc, field) => {
      acc[field.name] = '';
      return acc;
    },
    {} as Record<string, string>,
  );

  const [formValues, setFormValues] = useState(initialValues);
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  // 유효성 검사
  const validate = () => {
    let valid = true;
    for (const field of fields) {
      const value = formValues[field.name];

      if (!value.trim()) {
        valid = false;
        break;
      }

      if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          valid = false;
          break;
        }
      }

      if (field.type === 'password') {
        if (value.length < 8) {
          valid = false;
          break;
        }
      }
    }
    setIsValid(valid);
  };

  // 인풋 변경시 유효성 검사
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    validate();
  }, [formValues]);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await apiClient.post(apiEndpoint, formValues);
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        setMessage('성공적으로 처리되었습니다.');
        if (onSuccess) onSuccess(response.data);
        router.push(ROUTES.DASHBOARD);
      } else {
        setMessage('처리 성공');
      }
    } catch (error) {
      console.error(`${title} 오류:`, error);
      setMessage(`${title} 실패`);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <Image src='/images/images_logo.png' alt='로고 이미지' width={200} height={280} />
      <div className='mt-4 w-full max-w-sm'>
        <h2 className='text-center text-xl font-semibold mb-4'>{title}</h2>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          {fields.map((field) => (
            <div key={field.name} className='flex flex-col'>
              <label className='mb-1'>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formValues[field.name]}
                onChange={handleChange}
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>
          ))}
          <button
            type='submit'
            disabled={!isValid}
            className={`${
              !isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-pri'
            } text-white py-2 px-4 rounded`}
          >
            {title}
          </button>
        </form>
        {message && <p className='mt-4 text-center'>{message}</p>}
      </div>
    </div>
  );
};
