interface ImageUploadProps {
  imageUrl: string | null;
  handleFileChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, handleFileChange }) => (
  <div>
    <label htmlFor='file'>이미지</label>
    <input
      id='file'
      type='file'
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          handleFileChange(e.target.files[0]);
        }
      }}
      className='w-[76px] h-[107px]'
    />
    {imageUrl && <img src={imageUrl} alt='Upload' className='w-[76px] h-[107px]' />}
  </div>
);
export default ImageUpload;
export type { ImageUploadProps };
