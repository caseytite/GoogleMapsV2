import React, { useContext, useEffect, useState } from "react";
import { LoggedInUser } from "../../context/AuthContext";
import Button from "./Button";
import "../../styles/Header.css";
import axios from "axios";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useNavigate } from "react-router-dom";
import useWaterColor from "../../hooks/useWaterColor";

const Header = ({ user, style }) => {
  const loggedInUser = useContext(LoggedInUser);
  const navigate = useNavigate();
  const [userLoaded, setUserLoaded] = useState(user);
  const findWaterColor = useWaterColor();
  const [backgroundColor, logoColor, iconColor] = findWaterColor;

  useEffect(() => {
    if (user?.first_name) {
      setUserLoaded(user);
    }
  }, [user]);

  const goToLogin = () => {
    navigate("/login");
  };

  const handleLanding = () => {
    navigate("/");
  };

  const handleLogout = () => {
    loggedInUser.logout();
    navigate("/");
    axios.post("/user/logout");
  };

  return (
    <div
      className="header-container"
      style={{
        backgroundColor: `${backgroundColor}`,
      }}
    >
      <header className="header">
        <div className="title">
          {userLoaded && (
            <h2 style={{ color: `${logoColor}` }}>
              Hello {userLoaded.first_name}!
            </h2>
          )}
          {!userLoaded && (
            <h1 style={{ color: "white" }} onClick={handleLanding}>
              Mapps!
            </h1>
          )}
          <AddLocationAltIcon
            sx={{
              fontSize: "xxx-large",
              color: `${iconColor}`,
            }}
          />
        </div>
        {userLoaded && (
          <div className="user-name">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
        {!userLoaded && <Button onClick={goToLogin}>Login</Button>}
      </header>
    </div>
  );
};

export default React.memo(Header);
