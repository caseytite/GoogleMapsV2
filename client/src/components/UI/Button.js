import "../../styles/Button.css";

const Button = (props) => {
  const { btnClass } = props;
  return (
    <button onClick={props.onClick} className={btnClass ? btnClass : "button"}>
      {props.children}
    </button>
  );
};

export default Button;
