import Button from "./Button";
import "../styles/Header.css";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInUser from "../context/AuthContext";

const Header = (props) => {
  const navigate = useNavigate();
  const context = useContext(LoggedInUser);
  const { userId } = context;

  const isLoggedIn = userId ? true : false;

  const goToLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");

    axios.post("/logout");
  };

  return (
    <div className="header-container">
      <header className="header">
        <h1>Maps!</h1>
        {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
        {!isLoggedIn && <Button onClick={goToLogin}>Login</Button>}
      </header>
    </div>
  );
};

export default Header;
