const Input = (props) => {
  return (
    <input
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    ></input>
  );
};
export default Input;
