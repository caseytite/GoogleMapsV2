import Button from "./Button";
import "../styles/Header.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Header = (props) => {
  const navigate = useHistory();
  const goToLogin = () => {
    navigate.push("/login");
  };

  const handleLogout = () => {
    localStorage.clear();

    axios.post("/logout");

    return navigate.push("/");
  };

  const isLoggedIn = localStorage.getItem("userId") ? true : false;
  console.log("isLoggedIn", isLoggedIn);
  return (
    <div className="header-container">
      <h1>Maps</h1>
      {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
      {!isLoggedIn && <Button onClick={goToLogin}>Login</Button>}
    </div>
  );
};

export default Header;
