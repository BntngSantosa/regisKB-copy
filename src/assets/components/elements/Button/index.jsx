const Button = ({ text, disabled, ...rest }) => {
  return (
    <button
      className="w-full p-3 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400"
      {...rest}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
