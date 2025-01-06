import Input from "../../elements/Input";
import Label from "../../elements/Label";
import Select from "../../elements/Select";

const FormField = ({
  id,
  label,
  placeholder,
  type = "text",
  options,
  value,
  onChange,
  disabled
}) => {
  return (
    <div className="mb-5">
      <Label htmlFor={id}>{label}</Label>
      {options ? (
        <Select
          id={id}
          options={options}
          label={label}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Input
          id={id}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default FormField;
