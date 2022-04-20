import Button from "./Button";
import "../../styles/Header.css";
import axios from "axios";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
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

  return (
    <div className="header-container">
      <header className="header">
        <div className="title">
          {user && <h1>Mapps!</h1>}
          {!user && <h1 onClick={handleLanding}>Mapps!</h1>}
          <AddLocationAltIcon
            sx={{
              fontSize: "xxx-large",
              color: "hsl(83deg 67% 60%)",
            }}
          />
        </div>
        {user && <Button onClick={handleLogout}>Logout</Button>}
        {!user && <Button onClick={goToLogin}>Login</Button>}
      </header>
    </div>
  );
};

export default Header;
