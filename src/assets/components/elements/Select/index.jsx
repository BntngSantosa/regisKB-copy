const Select = ({ id, options, value, label, onChange }) => (
  <select
    id={id}
    value={value}
    label={label}
    onChange={onChange}
    className="w-full p-2 bg-white rounded-md"
  >
    <option value="">Pilih {label}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
