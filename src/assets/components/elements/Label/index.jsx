const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="block text-white text-sm mb-1">
      {children}
    </label>
  );
};

export default Label;
