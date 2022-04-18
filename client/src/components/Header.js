import Button from "./Button";
import "../styles/Header.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import LoggedInUser from "../context/AuthContext";
import { is } from "date-fns/locale";

const Header = (props) => {
  const navigate = useHistory();
  const context = useContext(LoggedInUser);
  const { userId } = context;

  const isLoggedIn = userId ? true : false;

  const goToLogin = () => {
    navigate.push("/login");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate.push("/");

    axios.post("/logout");
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
