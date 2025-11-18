const Input = ({ label, defaultValue }) => {
  return (
    <p className="control">
      <label htmlFor={label}>{label.replace(/-/g, " ")}</label>
      <input
        type="text"
        id={label}
        name={label}
        required
        defaultValue={defaultValue}
      />
    </p>
  );
};

export default Input;
