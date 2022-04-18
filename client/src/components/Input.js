const Input = (props) => {
  return (
    <input
      className={props.className}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      type={props.type}
    ></input>
  );
};
export default Input;
