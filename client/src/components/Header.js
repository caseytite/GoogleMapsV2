import Button from "./Button";
import "../styles/Header.css";
import { useHistory } from "react-router-dom";
const Header = (props) => {
  const navigate = useHistory();
  const goToLogin = () => {
    navigate.push("/login");
  };
  return (
    <div className="header-container">
      <h1>Maps</h1>
      <Button onClick={goToLogin}>Login</Button>
    </div>
  );
};

export default Header;
