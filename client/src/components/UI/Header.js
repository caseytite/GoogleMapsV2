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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    axios.post("/user/logout");
  };

  const handleLanding = () => {
    navigate("/");
  };

  return (
    <div className="header-container">
      <header className="header">
        <div className="title">
          <h1 onClick={handleLanding}>Mapps!</h1>
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
