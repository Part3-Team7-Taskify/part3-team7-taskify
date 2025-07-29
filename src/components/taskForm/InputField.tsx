interface InputFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id?: string;
  placeholder: string;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, onChange, type, id, placeholder }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      className='w-full border border-gray-400 rounded p-2'
    />
  </div>
);

export default InputField;
