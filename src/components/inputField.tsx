interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type, id }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} value={value} onChange={onChange} className={'border p-2 w-full'} />
  </div>
);

export default InputField;
