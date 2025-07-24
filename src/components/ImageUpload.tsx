interface ImageUploadProps {
  imageUrl: string | null;
  handleFileChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, handleFileChange }) => (
  <div>
    <div className='relative'>
      <input
        id='file'
        type='file'
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
        className='absolute inset-0 opacity-0 cursor-pointer'
      />
      <div>
        <div className='w-[76px] h-[76px] bg-gray-400'></div>
      </div>
    </div>

    {imageUrl && <img src={imageUrl} alt='Upload' />}
  </div>
);
export default ImageUpload;
export type { ImageUploadProps };
