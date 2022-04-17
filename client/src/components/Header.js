import Button from "./Button";
import "../styles/Header.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import LoggedInUser from "../context/AuthContext";

const Header = (props) => {
  const navigate = useHistory();
  const context = useContext(LoggedInUser);
  const { userId } = context;

  const isLoggedIn = userId ? true : false;
  console.log("isLoggedIn", isLoggedIn);
  console.log("context", userId);

  const goToLogin = () => {
    navigate.push("/login");
  };

  const handleLogout = () => {
    localStorage.clear();

    axios.post("/logout");

    navigate.push("/");
  };

  return (
    <div className="header-container">
      <h1>Maps!</h1>
      {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
      {!isLoggedIn && <Button onClick={goToLogin}>Login</Button>}
    </div>
  );
};

export default Header;
