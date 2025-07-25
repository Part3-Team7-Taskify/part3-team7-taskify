import Image from 'next/image';

interface ImageUploadProps {
  imageUrl: string | null;
  handleFileChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, handleFileChange }) => (
  <div className='mb-[90px]'>
    <div className='relative'>
      <input
        id='file'
        type='file'
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
        className='z-10 absolute inset-0 opacity-0 w-[76px] h-[76px] cursor-pointer'
      />
      <div className='absolute top-0'>
        <div className='relative w-[76px] h-[76px] bg-gray-200'>
          <Image
            src='/icon/icon_add.svg'
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer'
            width={28}
            height={28}
          />
        </div>
      </div>
    </div>

    {imageUrl && <img src={imageUrl} alt='Upload' />}
  </div>
);
export default ImageUpload;
export type { ImageUploadProps };
