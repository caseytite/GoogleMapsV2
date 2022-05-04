import "../../styles/Button.css";

const Button = ({ btnClass, onClick, children }) => {
  return (
    <button onClick={onClick} className={btnClass ? btnClass : "button"}>
      {children}
    </button>
  );
};

export default Button;
