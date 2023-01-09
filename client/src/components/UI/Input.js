const Input = (props) => {
  return (
    <input
      className={props.className}
      placeholder={props.placeholder}
      value={props.value ? props.value : ""}
      onChange={props.onChange && ((e) => props.onChange(e.target.value))}
      type={props.type}
      required={props.required ? true : false}
    />
  );
};

export default Input;
