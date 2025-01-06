const Input = ({ id, placeholder, type = "text", value, onChange }) => (
  <input
    id={id}
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={onChange}
    className="w-full p-2 bg-white rounded-md"
  />
);

export default Input;
