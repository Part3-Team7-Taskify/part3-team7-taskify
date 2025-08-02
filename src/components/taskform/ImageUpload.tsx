'use client';
import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  previewUrl: string | null;
  handleFileChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ handleFileChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    handleFileChange(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className='mb-[90px] relative'>
      <div className='relative'>
        <input
          id='file'
          type='file'
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
          className='z-10 absolute inset-0 opacity-0 w-[76px] h-[76px] cursor-pointer'
        />
        <div className='absolute top-0'>
          <div className='relative w-[76px] h-[76px] bg-gray-200 rounded-lg'>
            <Image
              src='/icon/icon_add.svg'
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-md'
              width={28}
              height={28}
              alt='업로드 아이콘'
            />
          </div>
        </div>
      </div>

      {previewUrl && (
        <Image
          src={previewUrl}
          alt='이미지업로드'
          width={76}
          height={76}
          className='absolute mb-1 w-[76px] h-[76px] object-cover '
        />
      )}
    </div>
  );
};

export default ImageUpload;
export type { ImageUploadProps };
