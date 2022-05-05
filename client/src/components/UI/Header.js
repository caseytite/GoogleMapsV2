import React from "react";
import Button from "./Button";
import "../../styles/Header.css";
import axios from "axios";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useNavigate } from "react-router-dom";

const Header = ({ user, style }) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleLanding = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    axios.post("/user/logout");
  };

  const findWaterColor = (style) => {
    if (style) {
      const waterColor = style.filter((sty) => sty.featureType === "water");
      const bgColor = waterColor[0].stylers[0].color;
      let textColor = "black";
      if ((bgColor[1] === "0" && bgColor[2] !== "0") || bgColor[1] === "2") {
        textColor = "whitesmoke";
      }
      let iconColor = "hsl(83deg 67% 60%)";
      if (bgColor[1] === "a") {
        iconColor = "hsl(136deg 53% 43%)";
      }
      return [bgColor, textColor, iconColor];
    }
    return ["hsl(198deg 100% 43%)", "black", "hsl(83deg 67% 60%)"];
  };

  return (
    <div
      className="header-container"
      style={{
        backgroundColor: `${findWaterColor(style)[0]}`,
      }}
    >
      <header className="header">
        <div className="title">
          {user && (
            <h1
              style={{
                color: `${findWaterColor(style)[1]}`,
              }}
            >
              Mapps!
            </h1>
          )}
          {!user && <h1 onClick={handleLanding}>Mapps!</h1>}
          <AddLocationAltIcon
            sx={{
              fontSize: "xxx-large",
              color: `${findWaterColor(style)[2]}`,
            }}
          />
        </div>
        {user && <Button onClick={handleLogout}>Logout</Button>}
        {!user && <Button onClick={goToLogin}>Login</Button>}
      </header>
    </div>
  );
};

export default React.memo(Header);
